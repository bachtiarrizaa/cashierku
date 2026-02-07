<?php

namespace App\Http\Controllers;

use App\Models\Insurance;
use App\Models\Procedure;
use App\Models\ProcedurePrice;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function __construct(
        private TransactionService $transactionService
    ) {}

    /**
     * Daftar semua transaksi.
     */
    public function index(Request $request)
    {
        $transactions = Transaction::with(['insurance', 'user'])
            ->when($request->date_from, function ($q, $date) {
                $q->whereDate('paid_at', '>=', $date);
            })
            ->when($request->date_to, function ($q, $date) {
                $q->whereDate('paid_at', '<=', $date);
            })
            ->when($request->search, function ($q, $search) {
                $q->where(function ($q2) use ($search) {
                    $q2->where('transaction_number', 'like', "%{$search}%")
                        ->orWhere('patient_name', 'like', "%{$search}%");
                });
            })
            ->latest('paid_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'filters' => $request->only(['search', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Halaman form transaksi baru.
     */
    public function create()
    {
        $currentPrices = ProcedurePrice::getCurrentPricesForProcedures();
        $procedures = Procedure::orderBy('name')->get()->map(function (Procedure $p) use ($currentPrices) {
            $priceRow = $currentPrices->get($p->id);
            return [
                'id' => $p->id,
                'name' => $p->name,
                'unit_price' => $priceRow ? (int) $priceRow->unit_price : 0,
            ];
        })->filter(fn ($p) => $p['unit_price'] > 0)->values();

        return Inertia::render('Transactions/Create', [
            'insurances' => Insurance::orderBy('name')->get(),
            'procedures' => $procedures,
            'payment_methods' => [
                ['value' => 'cash', 'label' => 'Tunai'],
                ['value' => 'debit', 'label' => 'Debit'],
                ['value' => 'credit', 'label' => 'Kredit'],
                ['value' => 'transfer', 'label' => 'Transfer'],
                ['value' => 'qris', 'label' => 'QRIS'],
            ],
        ]);
    }

    /**
     * Hitung diskon (dipanggil dari frontend saat insurance / items berubah).
     */
    public function calculateDiscount(Request $request)
    {
        $request->validate([
            'insurance_id' => 'nullable|exists:insurances,id',
            'items' => 'required|array',
            'items.*.procedure_id' => 'required|exists:procedures,id',
            'items.*.price' => 'required|integer|min:0',
        ]);

        $result = $this->transactionService->calculateDiscount(
            $request->input('insurance_id'),
            $request->input('items')
        );

        return response()->json($result);
    }

    /**
     * Simpan transaksi & bayar.
     */
    public function store(Request $request)
    {
        $rules = [
            'patient_name' => 'required|string|max:255',
            'insurance_id' => 'required|exists:insurances,id',
            'payment_method' => 'required|in:cash,debit,credit,transfer,qris',
            'items' => 'required|array|min:1',
            'items.*.procedure_id' => 'required|exists:procedures,id',
            'items.*.price' => 'required|integer|min:0',
            'items.*.discount' => 'required|integer|min:0',
            'items.*.final_price' => 'required|integer|min:0',
            'items.*.voucher_id' => 'nullable|exists:vouchers,id',
        ];

        $paymentMethod = $request->input('payment_method');
        if ($paymentMethod === 'cash') {
            $rules['payment_amount'] = 'required|integer|min:0';
        } elseif (in_array($paymentMethod, ['debit', 'credit'])) {
            $rules['payment_reference'] = 'required|string|max:50';
        }
        // transfer: VA digenerate di backend
        // qris: tidak perlu input tambahan

        $validated = $request->validate($rules);

        $calculated = $this->transactionService->calculateDiscount(
            $validated['insurance_id'],
            array_map(fn ($i) => ['procedure_id' => $i['procedure_id'], 'price' => $i['price']], $validated['items'])
        );

        $totalAmount = $calculated['total_amount'];
        $totalDiscount = $calculated['total_discount'];
        $finalAmount = $calculated['final_amount'];

        if ($paymentMethod === 'cash') {
            $paymentAmount = (int) $validated['payment_amount'];
            if ($paymentAmount < $finalAmount) {
                return redirect()->back()->withErrors(['payment_amount' => 'Uang pembayaran tidak boleh kurang dari total bayar.']);
            }
        }

        $transactionNumber = 'TRX-' . date('Ymd') . '-' . strtoupper(Str::random(6));
        while (Transaction::where('transaction_number', $transactionNumber)->exists()) {
            $transactionNumber = 'TRX-' . date('Ymd') . '-' . strtoupper(Str::random(6));
        }

        $paymentReference = $validated['payment_reference'] ?? $request->input('payment_reference');
        $paymentAmountValue = null;

        if ($paymentMethod === 'transfer') {
            $paymentReference = $paymentReference ?: $this->generateVA();
        } elseif ($paymentMethod === 'cash') {
            $paymentAmountValue = (int) $validated['payment_amount'];
        } elseif (in_array($paymentMethod, ['debit', 'credit'])) {
            $paymentReference = $validated['payment_reference'];
        }

        $transaction = Transaction::create([
            'transaction_number' => $transactionNumber,
            'patient_name' => $validated['patient_name'],
            'user_id' => $request->user()->id,
            'insurance_id' => $validated['insurance_id'],
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'paid',
            'payment_reference' => $paymentReference,
            'payment_amount' => $paymentAmountValue,
            'total_amount' => $totalAmount,
            'total_discount' => $totalDiscount,
            'final_amount' => $finalAmount,
            'paid_at' => now(),
        ]);

        foreach ($calculated['items'] as $item) {
            $procedure = Procedure::find($item['procedure_id']);
            TransactionItem::create([
                'transaction_id' => $transaction->id,
                'procedure_id' => $item['procedure_id'],
                'voucher_id' => $item['voucher_id'],
                'price' => $item['price'],
                'discount' => $item['discount'],
                'final_price' => $item['final_price'],
            ]);
        }

        return redirect()->route('transactions.receipt', $transaction->id)->with('success', 'Transaksi berhasil disimpan.');
    }

    /**
     * Generate nomor VA acak (16 digit).
     */
    private function generateVA(): string
    {
        return str_pad((string) random_int(1000000000000000, 9999999999999999), 16, '0', STR_PAD_LEFT);
    }

    /**
     * Halaman bukti pembayaran (untuk cetak).
     */
    public function receipt(Transaction $transaction)
    {
        $transaction->load(['items.procedure', 'items.voucher', 'insurance', 'user']);

        return Inertia::render('Transactions/Receipt', [
            'transaction' => $transaction,
        ]);
    }
}
