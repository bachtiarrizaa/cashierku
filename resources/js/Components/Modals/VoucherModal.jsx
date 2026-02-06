import { useVoucherModal } from '../../Hooks/Vouchers/useVoucherModal';

export default function VoucherModal({ isOpen, onClose, editData, insurances }) {
    const { data, setData, handleSubmit, processing, errors } = useVoucherModal(isOpen, editData, onClose);

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
                                    {editData ? 'Ubah Voucher' : 'Tambah Voucher Baru'}
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-600 cursor-pointer">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            <div className="border-t border-gray-200 mb-4"></div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Voucher</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Contoh: Diskon Grand Opening"
                                        className={`block w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40 transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    />
                                    {errors.name && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Asuransi Terkait</label>
                                    <select
                                        value={data.insurance_id}
                                        onChange={e => setData('insurance_id', e.target.value)}
                                        className={`block w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all ${errors.insurance_id ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    >
                                        <option value="">Pilih Asuransi</option>
                                        {insurances.map(ins => (
                                            <option key={ins.id} value={ins.id}>{ins.name}</option>
                                        ))}
                                    </select>
                                    {errors.insurance_id && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.insurance_id}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Tipe Diskon</label>
                                        <select
                                            value={data.type}
                                            onChange={e => setData('type', e.target.value)}
                                            className="block w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                                        >
                                            <option value="percentage">Persentase</option>
                                            <option value="fixed">Nominal Tetap</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            {data.type === 'percentage' ? 'Persen (%)' : 'Nilai (Rp)'}
                                        </label>
                                        <input
                                            type="number"
                                            value={data.value}
                                            onChange={e => setData('value', e.target.value)}
                                            placeholder={data.type === 'percentage' ? '0-100' : '0'}
                                            className={`block w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all ${errors.value ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                        />
                                        {errors.value && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.value}</p>}
                                    </div>
                                </div>

                                {data.type === 'percentage' && (
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Limit Maksimal Diskon (Rp, Opsional)</label>
                                        <input
                                            type="number"
                                            value={data.max_discount}
                                            onChange={e => setData('max_discount', e.target.value)}
                                            placeholder="Sediakan jika ada batas maksimal"
                                            className="block w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Berlaku</label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={e => setData('start_date', e.target.value)}
                                            className={`block w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all ${errors.start_date ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                        />
                                        {errors.start_date && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.start_date}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Berakhir</label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={e => setData('end_date', e.target.value)}
                                            className={`block w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all ${errors.end_date ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                        />
                                        {errors.end_date && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.end_date}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setData('is_active', !data.is_active)}>
                                    <input
                                        id="modal_is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="h-3 w-3 text-cyan-00 focus:ring-cyan-300 border-gray-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="modal_is_active" className="ml-3 block text-xs font-medium text-gray-700 cursor-pointer">
                                        Voucher ini Aktif & Dapat Digunakan
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-6 flex flex-col sm:flex-row-reverse gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 text-xs text-white font-medium border border-cyan-700 rounded-md bg-cyan-600 hover:bg-cyan-700 cursor-pointer transition-colors"
                            >
                                {editData ? 'Simpan' : 'Tambah'}
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
