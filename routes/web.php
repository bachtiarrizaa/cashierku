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

  Route::resource('/insurances', \App\Http\Controllers\InsuranceController::class)->only(['index']);
  Route::resource('/procedures', \App\Http\Controllers\ProcedureController::class)->only(['index']);
  Route::resource('/procedure-prices', \App\Http\Controllers\ProcedurePriceController::class)->only(['index']);
  Route::resource('/vouchers', \App\Http\Controllers\VoucherController::class);

  Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::fallback(function () {
  return Inertia::render('NotFound');
});