<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Admin: total transaksi hari ini, pendapatan hari ini, voucher aktif, total user, daftar transaksi terbaru.
     */
    public function admin(Request $request)
    {
        $todayStart = Carbon::today();
        $todayEnd = Carbon::today()->endOfDay();

        $transactionsToday = Transaction::where('payment_status', 'paid')
            ->whereBetween('paid_at', [$todayStart, $todayEnd]);

        $totalTransactionsToday = (clone $transactionsToday)->count();
        $totalRevenueToday = (clone $transactionsToday)->sum('final_amount');
        $totalActiveVouchers = Voucher::where('is_active', true)
            ->whereDate('start_date', '<=', today())
            ->whereDate('end_date', '>=', today())
            ->count();
        $totalUsers = User::whereHas('role')->count();

        $latestTransactions = Transaction::with(['insurance', 'user'])
            ->where('payment_status', 'paid')
            ->latest('paid_at')
            ->limit(10)
            ->get();

        return Inertia::render('Dashboard/AdminDashboard', [
            'totalTransactionsToday' => $totalTransactionsToday,
            'totalRevenueToday' => $totalRevenueToday,
            'totalActiveVouchers' => $totalActiveVouchers,
            'totalUsers' => $totalUsers,
            'latestTransactions' => $latestTransactions,
        ]);
    }

    /**
     * Marketing: top asuransi by jumlah transaksi, by total pembayaran, total diskon per asuransi, transaksi per periode.
     */
    public function marketing(Request $request)
    {
        $period = $request->get('period', 'monthly'); // daily | monthly
        $dateFrom = $request->get('date_from', Carbon::today()->startOfMonth()->format('Y-m-d'));
        $dateTo = $request->get('date_to', Carbon::today()->format('Y-m-d'));

        if ($period === 'daily') {
            $dateFrom = Carbon::today()->subDay()->format('Y-m-d');
            $dateTo = Carbon::today()->format('Y-m-d');
        }

        $baseQuery = Transaction::where('payment_status', 'paid')
            ->whereDate('paid_at', '>=', $dateFrom)
            ->whereDate('paid_at', '<=', $dateTo);

        $topInsuranceByCount = (clone $baseQuery)
            ->select('insurance_id', DB::raw('count(*) as total'))
            ->groupBy('insurance_id')
            ->orderByDesc('total')
            ->limit(10)
            ->get()
            ->load('insurance:id,name');

        $topInsuranceByPayment = (clone $baseQuery)
            ->select('insurance_id', DB::raw('sum(final_amount) as total'))
            ->groupBy('insurance_id')
            ->orderByDesc('total')
            ->limit(10)
            ->get()
            ->load('insurance:id,name');

        $discountPerInsurance = (clone $baseQuery)
            ->select('insurance_id', DB::raw('sum(total_discount) as total_discount'))
            ->groupBy('insurance_id')
            ->orderByDesc('total_discount')
            ->get()
            ->load('insurance:id,name');

        $totalTransactionsInPeriod = (clone $baseQuery)->count();

        return Inertia::render('Dashboard/MarketingDashboard', [
            'topInsuranceByCount' => $topInsuranceByCount,
            'topInsuranceByPayment' => $topInsuranceByPayment,
            'discountPerInsurance' => $discountPerInsurance,
            'totalTransactionsInPeriod' => $totalTransactionsInPeriod,
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
            'period' => $period,
        ]);
    }

    /**
     * Cashier: total transaksi hari ini (oleh cashier ini), total pembayaran hari ini, riwayat transaksi terbaru hari ini.
     */
    public function cashier(Request $request)
    {
        $todayStart = Carbon::today();
        $todayEnd = Carbon::today()->endOfDay();

        $myTransactionsToday = Transaction::where('payment_status', 'paid')
            ->where('user_id', $request->user()->id)
            ->whereBetween('paid_at', [$todayStart, $todayEnd]);

        $totalMyTransactionsToday = (clone $myTransactionsToday)->count();
        $totalMyRevenueToday = (clone $myTransactionsToday)->sum('final_amount');

        $latestToday = Transaction::with(['insurance'])
            ->where('payment_status', 'paid')
            ->where('user_id', $request->user()->id)
            ->whereBetween('paid_at', [$todayStart, $todayEnd])
            ->latest('paid_at')
            ->limit(15)
            ->get();

        return Inertia::render('Dashboard/CashierDashboard', [
            'totalMyTransactionsToday' => $totalMyTransactionsToday,
            'totalMyRevenueToday' => $totalMyRevenueToday,
            'latestToday' => $latestToday,
        ]);
    }
}
