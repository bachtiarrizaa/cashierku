import { useUserModal } from '../../Hooks/Users/useUserModal';

export default function UserModal({ isOpen, onClose, editData, roles }) {
    const { data, setData, handleSubmit, processing, errors } = useUserModal(isOpen, editData, onClose);

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
                                    {editData ? 'Ubah User' : 'Tambah User Baru'}
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-600 cursor-pointer">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div className="border-t border-gray-200 mb-4" />
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nama</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama lengkap"
                                        className={`block w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    />
                                    {errors.name && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@contoh.com"
                                        disabled={!!editData}
                                        className={`block w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} ${editData ? 'bg-gray-100' : ''}`}
                                    />
                                    {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Password {editData && '(kosongkan jika tidak diubah)'}
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder={editData ? '••••••••' : 'Min. 8 karakter'}
                                        className={`block w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    />
                                    {errors.password && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                                    <select
                                        value={data.role_id}
                                        onChange={(e) => setData('role_id', e.target.value)}
                                        className={`block w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:border-cyan-600 focus:ring-cyan-300 ${errors.role_id ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    >
                                        <option value="">Pilih Role</option>
                                        {roles?.map((r) => (
                                            <option key={r.id} value={r.id}>{r.name}</option>
                                        ))}
                                    </select>
                                    {errors.role_id && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.role_id}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-6 flex flex-col sm:flex-row-reverse gap-3">
                            <button type="submit" disabled={processing} className="px-4 py-2 text-xs text-white font-medium border border-cyan-700 rounded-md bg-cyan-600 hover:bg-cyan-700 cursor-pointer transition-colors">
                                {editData ? 'Simpan' : 'Tambah'}
                            </button>
                            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
