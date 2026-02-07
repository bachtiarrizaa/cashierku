<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: sans-serif; font-size: 14px; color: #333; line-height: 1.5; }
        h1 { font-size: 18px; }
        p { margin: 0.5em 0; }
    </style>
</head>
<body>
    <h1>Laporan Transaksi Pembayaran</h1>
    <p>Berikut terlampir laporan seluruh transaksi pembayaran yang terjadi pada tanggal <strong>{{ $reportDate }}</strong>.</p>
    <p>Total transaksi: <strong>{{ $totalTransactions }}</strong></p>
    <p>File CSV terlampir dapat dibuka dengan Microsoft Excel atau aplikasi spreadsheet lainnya.</p>
    <p>Email ini dikirim otomatis oleh sistem.</p>
</body>
</html>
