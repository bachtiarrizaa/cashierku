<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InsuranceController;
use App\Http\Controllers\ProcedureController;
use App\Http\Controllers\ProcedurePriceController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\VoucherProcedureController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("Home");
})->name("home");

Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'registerForm'])->name('registerForm');
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::get('/login', [AuthController::class, 'loginForm'])->name('loginForm');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Data master: semua role yang butuh (untuk transaksi / voucher) bisa akses
    Route::get('/insurances', [InsuranceController::class, 'index'])->name('insurances.index');
    Route::get('/procedures', [ProcedureController::class, 'index'])->name('procedures.index');
    Route::get('/procedure-prices', [ProcedurePriceController::class, 'index'])->name('procedure-prices.index');

    // Admin only
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', [DashboardController::class, 'admin'])->name('admin.dashboard');
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });

    // Voucher & voucher-procedures: index untuk semua (view); create/update/delete hanya admin + marketing
    Route::get('/vouchers', [VoucherController::class, 'index'])->name('vouchers.index');
    Route::get('/voucher-procedures', [VoucherProcedureController::class, 'index'])->name('voucher-procedures.index');

    Route::middleware('role:admin,marketing')->group(function () {
        Route::get('/marketing/dashboard', [DashboardController::class, 'marketing'])->name('marketing.dashboard');
        Route::post('/vouchers', [VoucherController::class, 'store'])->name('vouchers.store');
        Route::put('/vouchers/{voucher}', [VoucherController::class, 'update'])->name('vouchers.update');
        Route::delete('/vouchers/{voucher}', [VoucherController::class, 'destroy'])->name('vouchers.destroy');
        Route::post('/voucher-procedures', [VoucherProcedureController::class, 'store'])->name('voucher-procedures.store');
        Route::delete('/voucher-procedures/{voucherProcedure}', [VoucherProcedureController::class, 'destroy'])->name('voucher-procedures.destroy');
    });

    // Transaksi: list & receipt untuk semua; create/store hanya cashier
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{transaction}/receipt', [TransactionController::class, 'receipt'])->name('transactions.receipt');

    Route::middleware('role:cashier')->group(function () {
        Route::get('/transactions/create', [TransactionController::class, 'create'])->name('transactions.create');
        Route::post('/transactions/calculate-discount', [TransactionController::class, 'calculateDiscount'])->name('transactions.calculate-discount');
        Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    });

    // Dashboard Cashier
    Route::middleware('role:cashier')->group(function () {
        Route::get('/cashier/dashboard', [DashboardController::class, 'cashier'])->name('cashier.dashboard');
    });
});

Route::fallback(function () {
    return Inertia::render('NotFound');
});
