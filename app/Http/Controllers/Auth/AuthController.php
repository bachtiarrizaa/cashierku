<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\LogoutRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\LoginService;
use App\Services\Auth\LogoutService;
use App\Services\Auth\RegisterService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function __construct(
        private readonly RegisterService $registerService,
        private readonly LoginService $loginService,
        private readonly LogoutService $logoutService,
    ) {}

    public function registerForm()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(RegisterRequest $request)
    {
        $this->registerService->handle($request->validated());

        return redirect()->route('login');
    }

    public function loginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(LoginRequest $request)
    {
        $this->loginService->handle($request->validated(), $request);

        $request->session()->regenerate();

        return Inertia::render('Auth/Login', [
            'loginSuccess' => true,
            'redirectTo'   => redirect()->intended('dashboard')->getTargetUrl(),
        ]);
    }

    public function logout(LogoutRequest $request)
    {
        $this->logoutService->handle($request);

        return Inertia::render('Auth/Login', [
            'logoutSuccess' => true,
        ]);
    }
}
