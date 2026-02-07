<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (! $request->user() || ! $request->user()->role) {
            abort(403, 'Unauthorized action.');
        }

        $allowed = array_map('trim', $roles);
        if (! in_array($request->user()->role->name, $allowed)) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
