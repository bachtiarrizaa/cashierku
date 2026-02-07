<?php

namespace App\Http\Controllers;

use App\Models\ProcedurePrice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProcedurePriceController extends Controller
{
    public function index(Request $request)
    {
        $query = ProcedurePrice::with('procedure');

        if ($request->input('search')) {
            $query->whereHas('procedure', function ($q) use ($request) {
                $q->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->input('search')) . '%']);
            });
        }

        $prices = $query->latest('procedure_prices.created_at')->paginate(10)->withQueryString();

        return Inertia::render('ProcedurePrices/Index', [
            'prices' => $prices,
            'filters' => $request->only(['search']),
        ]);
    }
}
