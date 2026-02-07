<?php

namespace App\Console\Commands;

use App\Mail\DailyTransactionsReportMail;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendDailyTransactionsReport extends Command
{
    protected $signature = 'transactions:send-daily-report';

    protected $description = 'Kirim laporan transaksi pembayaran hari kemarin dalam bentuk CSV ke email';

    public function handle(): int
    {
        $yesterday = Carbon::yesterday();
        $dateFrom = $yesterday->copy()->startOfDay();
        $dateTo = $yesterday->copy()->endOfDay();

        $transactions = Transaction::with(['insurance', 'user', 'items.procedure'])
            ->where('payment_status', 'paid')
            ->whereBetween('paid_at', [$dateFrom, $dateTo])
            ->orderBy('paid_at')
            ->get();

        $reportDate = $yesterday->format('d-m-Y');
        $csvContent = $this->buildCsv($transactions);

        $recipient = config('mail.daily_report_recipient', env('DAILY_REPORT_EMAIL'));
        if (empty($recipient)) {
            $this->warn('DAILY_REPORT_EMAIL tidak di-set. Skip pengiriman.');
            return self::SUCCESS;
        }

        try {
            Mail::to($recipient)->send(new DailyTransactionsReportMail(
                $reportDate,
                $transactions->count(),
                $csvContent
            ));
            $this->info("Laporan transaksi {$reportDate} ({$transactions->count()} transaksi) telah dikirim ke {$recipient}.");
        } catch (\Throwable $e) {
            $this->error('Gagal mengirim email: ' . $e->getMessage());
            return self::FAILURE;
        }

        return self::SUCCESS;
    }

    private function buildCsv($transactions): string
    {
        $sep = ',';
        $bom = "\xEF\xBB\xBF";

        $rows = [];
        $rows[] = [
            'No. Transaksi',
            'Tanggal',
            'Nama Pasien',
            'Asuransi',
            'Metode Pembayaran',
            'Total Harga',
            'Total Diskon',
            'Total Bayar',
            'Kasir',
            'Detail Tindakan',
        ];

        foreach ($transactions as $t) {
            $itemSummary = $t->items->map(fn ($i) => ($i->procedure?->name ?? '-') . ' (Rp ' . number_format($i->final_price, 0, ',', '.') . ')')->join('; ');
            $rows[] = [
                $t->transaction_number,
                $t->paid_at?->format('d/m/Y H:i'),
                $t->patient_name,
                $t->insurance?->name ?? '-',
                $t->payment_method,
                $t->total_amount,
                $t->total_discount,
                $t->final_amount,
                $t->user?->name ?? '-',
                $itemSummary,
            ];
        }

        $output = $bom;
        foreach ($rows as $row) {
            $output .= implode($sep, array_map(function ($cell) use ($sep) {
                $cell = (string) $cell;
                if (str_contains($cell, $sep) || str_contains($cell, '"') || str_contains($cell, "\n")) {
                    return '"' . str_replace('"', '""', $cell) . '"';
                }
                return $cell;
            }, $row)) . "\n";
        }

        return $output;
    }
}
