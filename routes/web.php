<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function() {
  return Inertia::render("Home");
})->name("home");

Route::middleware('guest')->group(function () {
  Route::get('/register', [AuthController::class, 'registerForm'])->name('registerForm');
  Route::post('/register', [AuthController::class, 'register'])->name('register');

  Route::get('/login', [AuthController::class, 'loginForm'])->name('loginForm');
  Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth')->group(function () {
  Route::middleware('role:admin')->group(function () {
      Route::get('/admin/dashboard', function () {
          return Inertia::render('Dashboard/AdminDashboard');
      })->name('admin.dashboard');
  });

  Route::middleware('role:cashier')->group(function () {
      Route::get('/cashier/dashboard', function () {
          return Inertia::render('Dashboard/CashierDashboard');
      })->name('cashier.dashboard');
  });

  Route::middleware('role:marketing')->group(function () {
      Route::get('/marketing/dashboard', function () {
          return Inertia::render('Dashboard/MarketingDashboard');
      })->name('marketing.dashboard');
  });

  Route::get('/insurances', [\App\Http\Controllers\InsuranceController::class, 'index'])->name('insurances.index');
  Route::get('/procedures', [\App\Http\Controllers\ProcedureController::class, 'index'])->name('procedures.index');
  Route::get('/procedure-prices', [\App\Http\Controllers\ProcedurePriceController::class, 'index'])->name('procedure-prices.index');

  Route::get('/vouchers', [\App\Http\Controllers\VoucherController::class, 'index'])->name('vouchers.index');
  Route::post('/vouchers', [\App\Http\Controllers\VoucherController::class, 'store'])->name('vouchers.store');
  Route::put('/vouchers/{voucher}', [\App\Http\Controllers\VoucherController::class, 'update'])->name('vouchers.update');
  Route::delete('/vouchers/{voucher}', [\App\Http\Controllers\VoucherController::class, 'destroy'])->name('vouchers.destroy');

  Route::get('/voucher-procedures', [\App\Http\Controllers\VoucherProcedureController::class, 'index'])->name('voucher-procedures.index');
  Route::post('/voucher-procedures', [\App\Http\Controllers\VoucherProcedureController::class, 'store'])->name('voucher-procedures.store');
  Route::delete('/voucher-procedures/{voucherProcedure}', [\App\Http\Controllers\VoucherProcedureController::class, 'destroy'])->name('voucher-procedures.destroy');

  Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::fallback(function () {
  return Inertia::render('NotFound');
});