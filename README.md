# Cashier.Ku

**Cashier.Ku** adalah aplikasi kasir untuk mengelola pembayaran rumah sakit.
Aplikasi ini membantu melacak invoice pasien, mengelola pembayaran, voucher diskon, serta menghasilkan laporan transaksi harian — semuanya dalam satu platform.

---

## 🚀 Fitur Utama

* Manajemen transaksi & pembayaran pasien
* Manajemen voucher & voucher tindakan
* Role-based access control (Admin, Kasir, Marketing)
* Sinkronisasi data master (asuransi, tindakan, harga)
* Laporan transaksi harian (CSV via email)
* Integrasi API RS Delta Surya (opsional)

---

## 🧰 Persyaratan Sistem

* **PHP** 8.5
* **Composer** 2.x
* **Node.js** 18+ & **npm**
* **Database**: **PostgreSQL**
* **Framework**: Laravel 12.x

---

## ⚙️ Cara Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/bachtiarrizaa/cashierku
cd cashierku
```

---

### 2. Install Dependensi Backend (PHP)

```bash
composer install
```

---

### 3. Install Dependensi Frontend

```bash
npm install
```

---

### 4. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

---

### 5. Konfigurasi Database (PostgreSQL)

Aplikasi ini **menggunakan PostgreSQL sebagai database utama**.

Pastikan PostgreSQL sudah berjalan, lalu sesuaikan konfigurasi di `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=cashierku
DB_USERNAME=postgres
DB_PASSWORD=root
```

Pastikan database sudah dibuat:

```sql
CREATE DATABASE cashierku;
```

---

### 6. Jalankan Migrasi & Seeder

```bash
php artisan migrate --seed
```

Seeder akan otomatis membuat:

* **3 Role**: Admin, Kasir, Marketing
* **User default** (lihat detail di `database/seeders/UserSeeder.php`)

---

### 7. Akun Default

| Role      | Email                                             | Password |
| --------- | ------------------------------------------------- | -------- |
| Admin     | [admin@gmail.com](mailto:admin@gmail.com)         | password |
| Kasir     | [cashier@gmail.com](mailto:cashier@gmail.com)     | password |
| Marketing | [marketing@gmail.com](mailto:marketing@gmail.com) | password |

---

### 8. Konfigurasi API RS Delta Surya

Jika ingin sinkron data asuransi, tindakan, dan harga dari API RS Delta Surya, tambahkan di `.env`:

```env
RS_API_BASE_URL=https://api.rs-delta-surya.example.com
RS_API_EMAIL=your-email@example.com
RS_API_PASSWORD=your-password
```

Lalu jalankan:

```bash
php artisan sync:delta-surya
```

---

### 9. Sinkronisasi Data Master

```bash
# Sinkron data asuransi
php artisan sync:insurances

# Sinkron data tindakan
php artisan sync:procedures

# Sinkron harga tindakan
php artisan sync:procedure-prices
```

---

### 10. Build Assets Frontend

**Development (Vite):**

```bash
npm run dev
```

Jalankan di terminal terpisah.

**Production:**

```bash
npm run build
```

---

### 11. Jalankan Server

```bash
php artisan serve
```

Aplikasi dapat diakses di:

```
http://127.0.0.1:8000
```

---

## 🔐 Peran & Hak Akses

| Role          | Hak Akses                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **Admin**     | Dashboard, User CRUD, Voucher & Voucher Tindakan (CRUD), Transaksi (read-only), Data Master (read-only) |
| **Kasir**     | Dashboard, Buat Transaksi, Voucher & Voucher Tindakan (read-only), Data Master (read-only)              |
| **Marketing** | Dashboard, Voucher & Voucher Tindakan (CRUD), Data Master (read-only)                                   |

---

## 📊 Laporan Harian

Aplikasi menjalankan scheduler untuk mengirim **laporan transaksi harian (CSV)** via email setiap **pukul 01:00**.

Tambahkan di `.env`:

```env
DAILY_REPORT_EMAIL=interview.deltasurya@yopmail.com
```

Jalankan scheduler:

```bash
php artisan schedule:work
```

Atau via crontab:

```bash
* * * * * cd /path/to/cashierku && php artisan schedule:run >> /dev/null 2>&1
```

---

## 🛠️ Troubleshooting

**Port 8000 sudah dipakai**

```bash
php artisan serve --port=8001
```

**Vite manifest not found**

```bash
npm run build
# atau pastikan npm run dev berjalan
```

**Error database**

* Pastikan PostgreSQL aktif
* Pastikan database sudah dibuat
* Jalankan ulang:

```bash
php artisan migrate:fresh --seed
```

**Class not found**

```bash
composer dump-autoload
```

---

## 🧱 Struktur Teknologi

* **Backend**: Laravel 12, Inertia.js, PHP 8.5
* **Frontend**: React 19, Tailwind CSS, Vite
* **Authentication**: Laravel Breeze (session-based)
* **Database**: PostgreSQL

---

## 📄 Lisensi

MIT License
