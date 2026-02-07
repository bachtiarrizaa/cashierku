import { useVoucherProcedureModal } from '../../Hooks/VoucherProcedures/useVoucherProcedureModal';

export default function VoucherProcedureModal({ isOpen, onClose, vouchers, procedures }) {
    const { data, setData, handleSubmit, processing, errors } = useVoucherProcedureModal(isOpen, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-6 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-semibold text-gray-700">
                                    Tambah Relasi Voucher & Tindakan
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-600 cursor-pointer">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            <div className="border-t border-gray-200 mb-4"></div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Voucher</label>
                                    <select
                                        value={data.voucher_id}
                                        onChange={(e) => setData('voucher_id', e.target.value)}
                                        className={`block w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40 transition-all ${errors.voucher_id ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    >
                                        <option value="">Pilih Voucher</option>
                                        {vouchers.map((v) => (
                                            <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                    </select>
                                    {errors.voucher_id && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.voucher_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Tindakan Medis</label>
                                    <select
                                        value={data.procedure_id}
                                        onChange={(e) => setData('procedure_id', e.target.value)}
                                        className={`block w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40 transition-all ${errors.procedure_id ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    >
                                        <option value="">Pilih Tindakan</option>
                                        {procedures.map((proc) => (
                                            <option key={proc.id} value={proc.id}>{proc.name}</option>
                                        ))}
                                    </select>
                                    {errors.procedure_id && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.procedure_id}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-6 flex flex-col sm:flex-row-reverse gap-3">
                            <button
                                type="submit"
                                disabled={processing || !data.voucher_id || !data.procedure_id}
                                className="px-4 py-2 text-xs text-white font-medium border border-cyan-700 rounded-md bg-cyan-600 hover:bg-cyan-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Menyimpan...' : 'Tambah'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
