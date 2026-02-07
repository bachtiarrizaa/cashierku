import MainLayout from "../../Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../Utils/formatDate";

export default function Receipt({ transaction }) {
    const printRef = useRef(null);

    const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Head title={`Bukti Pembayaran ${transaction.transaction_number}`} />
            <MainLayout>
                <div className="max-w-2xl mx-auto">
                    {/* Toolbar: hanya tampil di layar, disembunyikan saat print */}
                    <div className="flex items-center gap-4 mb-6 print:hidden">
                        <Link
                            href="/transactions/create"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Transaksi Baru
                        </Link>
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
                        >
                            <FontAwesomeIcon icon={faPrint} />
                            Cetak Bukti Pembayaran
                        </button>
                    </div>

                    <div ref={printRef} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 print:border-0 print:shadow-none">
                        <div className="text-center border-b border-gray-200 pb-4 mb-4">
                            <h1 className="text-lg font-bold text-gray-800">BUKTI PEMBAYARAN</h1>
                            <p className="text-sm text-gray-500 mt-1">No. {transaction.transaction_number}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-6">
                            <div className="text-gray-500">Tanggal</div>
                            <div className="text-gray-800">{transaction.paid_at ? formatDate(transaction.paid_at) : "-"}</div>

                            <div className="text-gray-500">Nama Pasien</div>
                            <div className="text-gray-800">{transaction.patient_name}</div>

                            <div className="text-gray-500">Asuransi</div>
                            <div className="text-gray-800">{transaction.insurance?.name ?? "-"}</div>

                            <div className="text-gray-500">Metode Pembayaran</div>
                            <div className="text-gray-800 capitalize">{transaction.payment_method}</div>

                            <div className="text-gray-500">Kasir</div>
                            <div className="text-gray-800">{transaction.user?.name ?? "-"}</div>
                        </div>

                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 text-gray-600 font-semibold">Tindakan</th>
                                    <th className="text-right py-2 text-gray-600 font-semibold">Harga</th>
                                    <th className="text-right py-2 text-gray-600 font-semibold">Diskon</th>
                                    <th className="text-right py-2 text-gray-600 font-semibold">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.items?.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        <td className="py-2 text-gray-700">{item.procedure?.name ?? "-"}</td>
                                        <td className="py-2 text-right text-gray-600">{formatRupiah(item.price)}</td>
                                        <td className="py-2 text-right text-red-600">-{formatRupiah(item.discount)}</td>
                                        <td className="py-2 text-right font-medium text-gray-800">{formatRupiah(item.final_price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6 pt-4 border-t border-gray-200 space-y-1 text-sm flex flex-col items-end">
                            <div className="flex justify-end gap-8">
                                <span className="text-gray-600">Total Harga</span>
                                <span className="font-medium">{formatRupiah(transaction.total_amount)}</span>
                            </div>
                            <div className="flex justify-end gap-8">
                                <span className="text-gray-600">Total Diskon</span>
                                <span className="font-medium text-red-600">-{formatRupiah(transaction.total_discount)}</span>
                            </div>
                            <div className="flex justify-end gap-8 pt-2">
                                <span className="font-semibold text-gray-700">Total Bayar</span>
                                <span className="font-bold text-lg text-cyan-700">{formatRupiah(transaction.final_amount)}</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-400 text-center mt-8">Terima kasih telah menggunakan layanan kami.</p>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
