import MainLayout from "../../Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faMoneyBillWave, faPlus, faList } from "@fortawesome/free-solid-svg-icons";

const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");
const formatDate = (d) => (d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "-");

export default function CashierDashboard({
    totalMyTransactionsToday = 0,
    totalMyRevenueToday = 0,
    latestToday = [],
}) {
    return (
        <>
            <Head title="Cashier Dashboard" />
            <MainLayout>
                <div className="p-4 md:p-6">
                    <h1 className="text-xl font-bold text-gray-800 mb-6">Cashier Dashboard</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Transaksi Saya Hari Ini</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{totalMyTransactionsToday}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faReceipt} className="text-cyan-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Pembayaran Hari Ini</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{formatRupiah(totalMyRevenueToday)}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <Link
                            href="/transactions/create"
                            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 shadow-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Buat Transaksi
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                <FontAwesomeIcon icon={faList} />
                                Riwayat Transaksi Hari Ini
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
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Waktu</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Pasien</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Asuransi</th>
                                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Total Bayar</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {latestToday?.length > 0 ? (
                                        latestToday.map((tx) => (
                                            <tr key={tx.id}>
                                                <td className="px-4 py-2 font-medium text-gray-800">{tx.transaction_number}</td>
                                                <td className="px-4 py-2 text-gray-600">{formatDate(tx.paid_at)}</td>
                                                <td className="px-4 py-2 text-gray-700">{tx.patient_name}</td>
                                                <td className="px-4 py-2 text-gray-600">{tx.insurance?.name ?? "-"}</td>
                                                <td className="px-4 py-2 text-right font-medium text-gray-800">{formatRupiah(tx.final_amount)}</td>
                                                <td className="px-4 py-2">
                                                    <Link
                                                        href={`/transactions/${tx.id}/receipt`}
                                                        className="text-cyan-600 hover:underline text-xs font-medium"
                                                    >
                                                        Bukti
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-8 text-center text-gray-500 italic">
                                                Belum ada transaksi hari ini.
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
