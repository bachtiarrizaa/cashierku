import MainLayout from "../../Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faMoneyBillWave, faTicket, faUsers, faList, faChartLine } from "@fortawesome/free-solid-svg-icons";

const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");
const formatDate = (d) => (d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-");

export default function AdminDashboard({
    totalTransactionsToday = 0,
    totalRevenueToday = 0,
    totalActiveVouchers = 0,
    totalUsers = 0,
    latestTransactions = [],
}) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <MainLayout>
                <div className="p-4 md:p-6">
                    <h1 className="text-xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Transaksi Hari Ini</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{totalTransactionsToday}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faReceipt} className="text-cyan-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Pendapatan Hari Ini</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{formatRupiah(totalRevenueToday)}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Voucher Aktif</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{totalActiveVouchers}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faTicket} className="text-purple-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Total User</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{totalUsers}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faUsers} className="text-amber-600 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <Link
                            href="/marketing/dashboard"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg hover:bg-cyan-100"
                        >
                            <FontAwesomeIcon icon={faChartLine} />
                            Dashboard Marketing
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                <FontAwesomeIcon icon={faList} />
                                Daftar Transaksi Terbaru
                            </h2>
                            <Link href="/transactions" className="text-xs font-medium text-cyan-600 hover:underline">
                                Lihat semua
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">No. Transaksi</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Tanggal</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Pasien</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Asuransi</th>
                                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Total Bayar</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Kasir</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {latestTransactions?.length > 0 ? (
                                        latestTransactions.map((tx) => (
                                            <tr key={tx.id}>
                                                <td className="px-4 py-2 font-medium text-gray-800">{tx.transaction_number}</td>
                                                <td className="px-4 py-2 text-gray-600">{formatDate(tx.paid_at)}</td>
                                                <td className="px-4 py-2 text-gray-700">{tx.patient_name}</td>
                                                <td className="px-4 py-2 text-gray-600">{tx.insurance?.name ?? "-"}</td>
                                                <td className="px-4 py-2 text-right font-medium text-gray-800">{formatRupiah(tx.final_amount)}</td>
                                                <td className="px-4 py-2 text-gray-600">{tx.user?.name ?? "-"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-8 text-center text-gray-500 italic">
                                                Belum ada transaksi.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
