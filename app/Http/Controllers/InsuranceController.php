<?php

namespace App\Http\Controllers;

use App\Models\Insurance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InsuranceController extends Controller
{
    public function index(Request $request)
    {
        $query = Insurance::query();

        if ($request->input('search')) {
            $query->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->input('search')) . '%']);
        }

        $insurances = $query->orderBy('name')->paginate(10)->withQueryString();

        return Inertia::render('Insurances/Index', [
            'insurances' => $insurances,
            'filters' => $request->only(['search']),
        ]);
    }
}
