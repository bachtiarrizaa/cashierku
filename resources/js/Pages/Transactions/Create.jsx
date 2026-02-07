import MainLayout from "../../Layouts/MainLayout";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faReceipt } from "@fortawesome/free-solid-svg-icons";
import QRCode from "react-qr-code";
import axios from "axios";

function generateVA() {
    return String(Math.floor(1000000000000000 + Math.random() * 9000000000000000));
}

export default function Create({ insurances, procedures, payment_methods }) {
    const [patientName, setPatientName] = useState("");
    const [insuranceId, setInsuranceId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentReference, setPaymentReference] = useState("");
    const [vaNumber, setVaNumber] = useState("");
    const [cart, setCart] = useState([]);
    const [calculated, setCalculated] = useState({
        items: [],
        total_amount: 0,
        total_discount: 0,
        final_amount: 0,
    });
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const fetchDiscount = useCallback(async () => {
        if (cart.length === 0) {
            setCalculated({ items: [], total_amount: 0, total_discount: 0, final_amount: 0 });
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post("/transactions/calculate-discount", {
                insurance_id: insuranceId || null,
                items: cart.map((c) => ({ procedure_id: c.procedure_id, price: c.price })),
            });
            setCalculated(data);
        } catch {
            setCalculated({
                items: cart.map((c) => ({
                    procedure_id: c.procedure_id,
                    price: c.price,
                    discount: 0,
                    final_price: c.price,
                    voucher_id: null,
                })),
                total_amount: cart.reduce((s, c) => s + c.price, 0),
                total_discount: 0,
                final_amount: cart.reduce((s, c) => s + c.price, 0),
            });
        } finally {
            setLoading(false);
        }
    }, [cart, insuranceId]);

    useEffect(() => {
        fetchDiscount();
    }, [fetchDiscount]);

    useEffect(() => {
        if (paymentMethod === "transfer") {
            setVaNumber(generateVA());
        } else {
            setVaNumber("");
        }
        setPaymentAmount("");
        setPaymentReference("");
    }, [paymentMethod]);

    const addProcedure = (procedure) => {
        if (!procedure.unit_price || procedure.unit_price <= 0) return;
        setCart((prev) => [
            ...prev,
            {
                procedure_id: procedure.id,
                procedure_name: procedure.name,
                price: procedure.unit_price,
            },
        ]);
    };

    const removeCartItem = (index) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patientName.trim()) return;
        if (!insuranceId) return;
        if (cart.length === 0) return;
        if (calculated.items.length === 0) return;

        const finalAmount = calculated.final_amount || 0;
        if (paymentMethod === "cash") {
            const paid = parseInt(paymentAmount, 10) || 0;
            if (paid < finalAmount) return;
        }
        if ((paymentMethod === "debit" || paymentMethod === "credit") && !paymentReference.trim()) return;

        setSubmitting(true);
        const payload = {
            patient_name: patientName.trim(),
            insurance_id: insuranceId,
            payment_method: paymentMethod,
            items: calculated.items.map((item) => {
                const cartItem = cart.find((c) => c.procedure_id === item.procedure_id);
                return {
                    procedure_id: item.procedure_id,
                    price: item.price,
                    discount: item.discount,
                    final_price: item.final_price,
                    voucher_id: item.voucher_id || null,
                };
            }),
        };
        if (paymentMethod === "cash") {
            payload.payment_amount = parseInt(paymentAmount, 10) || 0;
        } else if (paymentMethod === "transfer") {
            payload.payment_reference = vaNumber;
        } else if (paymentMethod === "debit" || paymentMethod === "credit") {
            payload.payment_reference = paymentReference.trim();
        }
        router.post("/transactions", payload, {
            onFinish: () => setSubmitting(false),
        });
    };

    const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

    return (
        <>
            <Head title="Transaksi Baru" />
            <MainLayout>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-xl font-bold text-gray-700 mb-6">Transaksi Kasir</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 1. Data awal */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-700 mb-4">1. Data Awal Transaksi</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Nama Pasien</label>
                                    <input
                                        type="text"
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        placeholder="Nama pasien"
                                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Asuransi</label>
                                    <select
                                        value={insuranceId}
                                        onChange={(e) => setInsuranceId(e.target.value)}
                                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300"
                                        required
                                    >
                                        <option value="">Pilih asuransi</option>
                                        {insurances.map((ins) => (
                                            <option key={ins.id} value={ins.id}>{ins.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 2. Tindakan medis */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-700 mb-4">2. Tindakan Medis</h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-xs text-gray-500">Tambah tindakan:</span>
                                {procedures.map((proc) => (
                                    <button
                                        key={proc.id}
                                        type="button"
                                        onClick={() => addProcedure(proc)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg hover:bg-cyan-100"
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
                                        {proc.name} ({proc.unit_price?.toLocaleString("id-ID")})
                                    </button>
                                ))}
                                {procedures.length === 0 && (
                                    <span className="text-xs text-amber-600">Belum ada harga tindakan berlaku hari ini.</span>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="min-w-full text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Tindakan</th>
                                                <th className="px-3 py-2 text-right text-xs font-semibold text-gray-600">Harga</th>
                                                <th className="w-10" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {cart.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-3 py-2 text-gray-700">{item.procedure_name}</td>
                                                    <td className="px-3 py-2 text-right text-gray-600">{formatRupiah(item.price)}</td>
                                                    <td className="px-2 py-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCartItem(index)}
                                                            className="text-red-600 hover:text-red-800 p-1"
                                                            title="Hapus"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* 3 & 4. Review + diskon otomatis */}
                        {calculated.items.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                <h2 className="text-sm font-semibold text-gray-700 mb-4">
                                    3 & 4. Review Transaksi {loading ? "(menghitung diskon…)" : ""}
                                </h2>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="min-w-full text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Tindakan</th>
                                                <th className="px-3 py-2 text-right text-xs font-semibold text-gray-600">Harga</th>
                                                <th className="px-3 py-2 text-right text-xs font-semibold text-gray-600">Diskon</th>
                                                <th className="px-3 py-2 text-right text-xs font-semibold text-gray-600">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {calculated.items.map((item, index) => {
                                                const cartItem = cart.find((c) => c.procedure_id === item.procedure_id);
                                                const discountLabel = item.discount === 0
                                                    ? "-"
                                                    : item.voucher_type === "percentage"
                                                        ? `${item.voucher_value ?? 0}%`
                                                        : `-${formatRupiah(item.discount)}`;
                                                return (
                                                    <tr key={index}>
                                                        <td className="px-3 py-2 text-gray-700">{cartItem?.procedure_name ?? "-"}</td>
                                                        <td className="px-3 py-2 text-right text-gray-600">{formatRupiah(item.price)}</td>
                                                        <td className="px-3 py-2 text-right text-red-600">{discountLabel}</td>
                                                        <td className="px-3 py-2 text-right font-medium text-gray-800">{formatRupiah(item.final_price)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 flex flex-col items-end gap-1 text-sm">
                                    <div className="flex justify-end gap-8">
                                        <span className="text-gray-600">Total harga:</span>
                                        <span className="font-medium">{formatRupiah(calculated.total_amount)}</span>
                                    </div>
                                    <div className="flex justify-end gap-8">
                                        <span className="text-gray-600">Total diskon:</span>
                                        <span className="font-medium text-red-600">-{formatRupiah(calculated.total_discount)}</span>
                                    </div>
                                    <div className="flex justify-end gap-8 pt-2 border-t border-gray-200">
                                        <span className="font-semibold text-gray-700">Total bayar:</span>
                                        <span className="font-bold text-lg text-cyan-700">{formatRupiah(calculated.final_amount)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 5. Metode pembayaran & Submit */}
                        {cart.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                <h2 className="text-sm font-semibold text-gray-700 mb-4">5. Simpan & Bayar</h2>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Metode Pembayaran</label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="block w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300"
                                    >
                                        {payment_methods.map((pm) => (
                                            <option key={pm.value} value={pm.value}>{pm.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tunai: uang pembayaran + kembalian */}
                                {paymentMethod === "cash" && calculated.final_amount > 0 && (
                                    <div className="mb-4 space-y-2">
                                        <label className="block text-xs font-medium text-gray-600">Uang Pembayaran</label>
                                        <input
                                            type="number"
                                            min={calculated.final_amount}
                                            value={paymentAmount}
                                            onChange={(e) => setPaymentAmount(e.target.value)}
                                            placeholder={`Min. ${formatRupiah(calculated.final_amount)}`}
                                            className="block w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300"
                                        />
                                        {paymentAmount && parseInt(paymentAmount, 10) >= calculated.final_amount && (
                                            <p className="text-sm text-green-600 font-medium">
                                                Kembalian: {formatRupiah(parseInt(paymentAmount, 10) - calculated.final_amount)}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Transfer: tampilkan VA */}
                                {paymentMethod === "transfer" && vaNumber && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Nomor VA Pembayaran</label>
                                        <p className="font-mono text-lg font-semibold text-gray-800 tracking-wider">{vaNumber}</p>
                                        <p className="text-xs text-gray-500 mt-1">Transfer ke nomor VA di atas sesuai total bayar</p>
                                    </div>
                                )}

                                {/* Debit / Kredit: input nomor kartu */}
                                {(paymentMethod === "debit" || paymentMethod === "credit") && (
                                    <div className="mb-4">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Nomor Kartu {paymentMethod === "debit" ? "Debit" : "Kredit"}
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentReference}
                                            onChange={(e) => setPaymentReference(e.target.value)}
                                            placeholder="Masukkan nomor kartu"
                                            maxLength={20}
                                            className="block w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300"
                                        />
                                    </div>
                                )}

                                {/* QRIS: tampilkan QR code */}
                                {paymentMethod === "qris" && calculated.final_amount > 0 && (
                                    <div className="mb-4 flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <label className="block text-xs font-medium text-gray-600 mb-2">Scan QR Code untuk pembayaran</label>
                                        <QRCode
                                            value={`QRIS-${calculated.final_amount}-${Date.now()}`}
                                            size={160}
                                            level="M"
                                            className="border border-gray-200 rounded-lg bg-white p-2"
                                        />
                                        <p className="text-sm text-gray-600 mt-2">{formatRupiah(calculated.final_amount)}</p>
                                    </div>
                                )}

                                {(() => {
                                    const canSubmit = paymentMethod === "cash"
                                        ? (parseInt(paymentAmount, 10) || 0) >= (calculated.final_amount || 0)
                                        : (paymentMethod === "debit" || paymentMethod === "credit")
                                            ? paymentReference.trim().length > 0
                                            : true;
                                    return (
                                        <button
                                            type="submit"
                                            disabled={submitting || !patientName.trim() || !insuranceId || calculated.items.length === 0 || !canSubmit}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FontAwesomeIcon icon={faReceipt} />
                                            {submitting ? "Menyimpan…" : "Bayar"}
                                        </button>
                                    );
                                })()}
                            </div>
                        )}
                    </form>
                </div>
            </MainLayout>
        </>
    );
}
