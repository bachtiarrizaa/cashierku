<?php

namespace App\Services\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class LoginService
{
    public function handle(array $credentials, ?Request $request = null)
    {
        if (! Auth::attempt($credentials)) {
            $validator = Validator::make(
                $request ? $request->only('email') : $credentials,
                ['email' => ['required']]
            );
            $validator->errors()->add('email', 'Email atau password salah.');
            throw new ValidationException($validator);
        }

        return Auth::user();
    }
}