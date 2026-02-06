<?php

namespace App\Http\Controllers;

use App\Models\Insurance;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoucherController extends Controller
{
    public function index(Request $request)
    {
        $vouchers = Voucher::with('insurance')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Vouchers/Index', [
            'vouchers' => $vouchers,
            'insurances' => Insurance::all(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'insurance_id' => 'required|exists:insurances,id',
            'name' => 'required|string|max:255',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|integer|min:0',
            'max_discount' => 'nullable|integer|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_active' => 'required|boolean',
        ]);

        Voucher::create($validated);

        return redirect()->back()->with('success', 'Voucher berhasil dibuat.');
    }

    public function update(Request $request, Voucher $voucher)
    {
        $validated = $request->validate([
            'insurance_id' => 'required|exists:insurances,id',
            'name' => 'required|string|max:255',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|integer|min:0',
            'max_discount' => 'nullable|integer|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_active' => 'required|boolean',
        ]);

        $voucher->update($validated);

        return redirect()->back()->with('success', 'Voucher berhasil diupdate.');
    }

    public function destroy(Voucher $voucher)
    {
        $voucher->delete();

        return redirect()->back()->with('success', 'Voucher berhasil dihapus.');
    }
}
