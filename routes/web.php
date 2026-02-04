<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function() {
  return Inertia::render("Home");
})->name("home");

Route::get("/login", function() {
  return Inertia::render("Auth/Login");
})->name("login");

Route::get("/register", function() {
  return Inertia::render("Auth/Register");
})->name("register");

Route::get("/dashboard", function() {
  return Inertia::render("Dashboard/index");
})->name("dashboard");


Route::fallback(function () {
  return Inertia::render('NotFound');
});