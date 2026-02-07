<?php

namespace App\Http\Controllers;

use App\Models\Procedure;
use App\Models\Voucher;
use App\Models\VoucherProcedure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoucherProcedureController extends Controller
{
    public function index(Request $request)
    {
        $voucherProcedures = VoucherProcedure::with(['voucher', 'procedure'])
            ->when($request->voucher_id, function ($query, $voucherId) {
                $query->where('voucher_id', $voucherId);
            })
            ->when($request->search, function ($query, $search) {
                $query->whereHas('procedure', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->latest('voucher_procedures.created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('VoucherProcedures/Index', [
            'voucherProcedures' => $voucherProcedures,
            'vouchers' => Voucher::orderBy('name')->get(),
            'procedures' => Procedure::orderBy('name')->get(),
            'filters' => $request->only(['search', 'voucher_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'voucher_id' => 'required|exists:vouchers,id',
            'procedure_id' => 'required|exists:procedures,id',
        ]);

        $exists = VoucherProcedure::where('voucher_id', $validated['voucher_id'])
            ->where('procedure_id', $validated['procedure_id'])
            ->exists();

        if ($exists) {
            return redirect()->back()->with('error', 'Relasi voucher dan tindakan ini sudah ada.');
        }

        VoucherProcedure::create($validated);

        return redirect()->back()->with('success', 'Relasi voucher dan tindakan berhasil ditambahkan.');
    }

    public function destroy(VoucherProcedure $voucherProcedure)
    {
        $voucherProcedure->delete();

        return redirect()->back()->with('success', 'Relasi voucher dan tindakan berhasil dihapus.');
    }
}
