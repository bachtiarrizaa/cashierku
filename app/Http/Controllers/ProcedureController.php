<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Procedure;
use Inertia\Inertia;

class ProcedureController extends Controller
{
    public function index(Request $request)
    {
        $query = Procedure::query();

        if ($request->input('search')) {
            $query->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->input('search')) . '%']);
        }

        $procedures = $query->paginate(10)
            ->withQueryString();

        return Inertia::render('Procedures/Index', [
            'procedures' => $procedures,
            'filters' => $request->only(['search'])
        ]);
    }
}
