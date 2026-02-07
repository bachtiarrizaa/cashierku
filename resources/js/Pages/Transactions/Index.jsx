import MainLayout from "../../Layouts/MainLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../Utils/formatDate";

export default function Index({ transactions, filters = {} }) {
    const role = usePage().props?.auth?.user?.role?.name ?? "";
    const canCreateTransaction = role === "admin" || role === "cashier";
    const [search, setSearch] = useState(filters.search || "");
    const [dateFrom, setDateFrom] = useState(filters.date_from || "");
    const [dateTo, setDateTo] = useState(filters.date_to || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = {
                search: search || undefined,
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
            };
            if (
                search !== (filters.search ?? "") ||
                dateFrom !== (filters.date_from ?? "") ||
                dateTo !== (filters.date_to ?? "")
            ) {
                router.get("/transactions", params, { preserveState: true, replace: true });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [search, dateFrom, dateTo]);

    const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");
    const paymentMethodLabel = {
        cash: "Tunai",
        debit: "Debit",
        credit: "Kredit",
        transfer: "Transfer",
        qris: "QRIS",
    };

    return (
        <>
            <Head title="Daftar Transaksi" />
            <MainLayout>
                <div className="px-2 py-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                        <h1 className="text-xl font-bold text-gray-700">Daftar Transaksi</h1>
                        {canCreateTransaction && (
                            <Link
                                href="/transactions/create"
                                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                Transaksi Baru
                            </Link>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="relative flex-1 max-w-xs">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="No. transaksi / nama pasien..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full py-2 pl-9 pr-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="py-2 px-3 text-sm border border-gray-300 rounded-md"
                            />
                            <span className="text-gray-500 text-sm">s/d</span>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="py-2 px-3 text-sm border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="pl-5 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">No</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">No. Transaksi</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Tanggal</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Pasien</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Asuransi</th>
                                        <th className="px-2 py-3 text-right text-xs font-semibold text-gray-700 tracking-wider">Total</th>
                                        <th className="px-2 py-3 text-right text-xs font-semibold text-gray-700 tracking-wider">Diskon</th>
                                        <th className="px-2 py-3 text-right text-xs font-semibold text-gray-700 tracking-wider">Bayar</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Metode</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.data?.length > 0 ? (
                                        transactions.data.map((tx, index) => (
                                            <tr key={tx.id}>
                                                <td className="pl-5 py-2 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {index + 1 + (transactions.current_page - 1) * transactions.per_page}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-700">
                                                    {tx.transaction_number}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-600">
                                                    {tx.paid_at ? formatDate(tx.paid_at) : "-"}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-700">
                                                    {tx.patient_name}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-600">
                                                    {tx.insurance?.name ?? "-"}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs text-right text-gray-600">
                                                    {formatRupiah(tx.total_amount)}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs text-right text-red-600">
                                                    -{formatRupiah(tx.total_discount)}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs text-right font-medium text-gray-800">
                                                    {formatRupiah(tx.final_amount)}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-600">
                                                    {paymentMethodLabel[tx.payment_method] ?? tx.payment_method}
                                                </td>
                                                <td className="pr-5 py-2 whitespace-nowrap">
                                                    <Link
                                                        href={`/transactions/${tx.id}/receipt`}
                                                        className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100"
                                                    >
                                                        <FontAwesomeIcon icon={faReceipt} />
                                                        Bukti
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="px-6 py-12 text-center text-gray-500 italic">
                                                Tidak ada transaksi ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination
                        links={transactions.links}
                        from={transactions.from ?? 0}
                        to={transactions.to ?? 0}
                        total={transactions.total ?? 0}
                    />
                </div>
            </MainLayout>
        </>
    );
}
