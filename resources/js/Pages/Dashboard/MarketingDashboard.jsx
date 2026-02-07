import MainLayout from "../../Layouts/MainLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faMoneyBillWave, faPercent, faReceipt } from "@fortawesome/free-solid-svg-icons";

const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

export default function MarketingDashboard({
    topInsuranceByCount = [],
    topInsuranceByPayment = [],
    discountPerInsurance = [],
    totalTransactionsInPeriod = 0,
    dateFrom = "",
    dateTo = "",
    period = "monthly",
}) {
    const [dateFromLocal, setDateFromLocal] = useState(dateFrom);
    const [dateToLocal, setDateToLocal] = useState(dateTo);

    const applyFilter = () => {
        router.get("/marketing/dashboard", {
            period: "monthly",
            date_from: dateFromLocal,
            date_to: dateToLocal,
        }, { preserveState: true });
    };

    return (
        <>
            <Head title="Marketing Dashboard" />
            <MainLayout>
                <div className="p-4 md:p-6">
                    <h1 className="text-xl font-bold text-gray-800 mb-6">Marketing Dashboard</h1>

                    <div className="flex flex-wrap gap-4 mb-6 items-end">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Dari</label>
                            <input
                                type="date"
                                value={dateFromLocal}
                                onChange={(e) => setDateFromLocal(e.target.value)}
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Sampai</label>
                            <input
                                type="date"
                                value={dateToLocal}
                                onChange={(e) => setDateToLocal(e.target.value)}
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
                            />
                        </div>
                        <button
                            onClick={applyFilter}
                            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
                        >
                            Terapkan
                        </button>
                    </div>

                    <div className="mb-6 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                        <p className="text-xs text-gray-600">Total transaksi periode</p>
                        <p className="text-2xl font-bold text-cyan-800">{totalTransactionsInPeriod}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            {dateFrom} s/d {dateTo}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-2">
                                <FontAwesomeIcon icon={faChartBar} className="text-cyan-600" />
                                <h2 className="text-sm font-semibold text-gray-800">Top Asuransi (Jumlah Transaksi)</h2>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {topInsuranceByCount?.length > 0 ? (
                                    topInsuranceByCount.map((item, i) => (
                                        <li key={i} className="px-5 py-3 flex justify-between items-center">
                                            <span className="text-sm text-gray-700">{item.insurance?.name ?? "-"}</span>
                                            <span className="text-sm font-semibold text-gray-800">{item.total}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-5 py-6 text-center text-gray-500 italic">Tidak ada data</li>
                                )}
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-2">
                                <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600" />
                                <h2 className="text-sm font-semibold text-gray-800">Top Asuransi (Total Pembayaran)</h2>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {topInsuranceByPayment?.length > 0 ? (
                                    topInsuranceByPayment.map((item, i) => (
                                        <li key={i} className="px-5 py-3 flex justify-between items-center">
                                            <span className="text-sm text-gray-700">{item.insurance?.name ?? "-"}</span>
                                            <span className="text-sm font-semibold text-gray-800">{formatRupiah(item.total)}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-5 py-6 text-center text-gray-500 italic">Tidak ada data</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-2">
                            <FontAwesomeIcon icon={faPercent} className="text-purple-600" />
                            <h2 className="text-sm font-semibold text-gray-800">Total Diskon per Asuransi</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-2 text-left text-xs font-semibold text-gray-600">Asuransi</th>
                                        <th className="px-5 py-2 text-right text-xs font-semibold text-gray-600">Total Diskon</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {discountPerInsurance?.length > 0 ? (
                                        discountPerInsurance.map((item, i) => (
                                            <tr key={i}>
                                                <td className="px-5 py-2 text-gray-700">{item.insurance?.name ?? "-"}</td>
                                                <td className="px-5 py-2 text-right font-medium text-red-600">{formatRupiah(item.total_discount)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="px-5 py-8 text-center text-gray-500 italic">
                                                Tidak ada data
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
