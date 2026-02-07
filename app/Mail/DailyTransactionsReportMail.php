<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DailyTransactionsReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $reportDate,
        public int $totalTransactions,
        public string $csvContent
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Laporan Transaksi Pembayaran - {$this->reportDate}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.daily-transactions-report',
        );
    }

    public function attachments(): array
    {
        $filename = "transaksi_{$this->reportDate}.csv";
        return [
            Attachment::fromData(fn () => $this->csvContent, $filename)
                ->withMime('text/csv'),
        ];
    }
}
