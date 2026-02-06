import MainLayout from "../../Layouts/MainLayout";
import { Head } from '@inertiajs/react';
import Pagination from "../../Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import VoucherModal from "../../Components/Modals/VoucherModal";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import { formatDate } from "../../Utils/formatDate";
import { useVoucher } from "../../Hooks/Vouchers/useVoucher";

export default function Index({ vouchers, insurances, filters = {} }) {
    const {
        search,
        setSearch,
        isModalOpen,
        editData,
        openCreateModal,
        openEditModal,
        closeModal,
        isDeleteModalOpen,
        confirmDelete,
        closeDeleteModal,
        handleDelete,
        deleting,
    } = useVoucher(filters);

    return (
        <>
            <Head title="Vouchers" />
            <MainLayout>
                <div className="px-2 py-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-4">
                        <h1 className="text-xl font-bold text-gray-700">Manajemen Voucher</h1>
                        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                            <div className="relative flex items-center w-full md:w-60">
                                <span className="absolute">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs mx-3 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari voucher..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="block w-full py-2 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:border-cyan-600 focus:ring-cyan-200 focus:outline-none focus:ring focus:ring-opacity-40 pl-11 text-sm"
                                />
                            </div>
                            <button
                                onClick={openCreateModal}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-xs text-white font-semibold border border-cyan-700 rounded-md bg-cyan-600 hover:bg-cyan-700 cursor-pointer transition-colors"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Tambah Voucher</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="pl-5 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">No</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Nama Voucher</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Asuransi</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Tipe</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Nilai</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Periode Berlaku</th>
                                        <th className="py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Status</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {vouchers.data.length > 0 ? (
                                        vouchers.data.map((voucher, index) => (
                                            <tr key={voucher.id}>
                                                <td className="pl-5 py-2 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {index + 1 + (vouchers.current_page - 1) * vouchers.per_page}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-700">
                                                    {voucher.name}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {voucher.insurance?.name}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs">
                                                    <span className={`px-2.5 py-1 rounded-full font-base ${voucher.type === 'percentage' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {voucher.type === 'percentage' ? 'Persentase' : 'Nominal Tetap'}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {voucher.type === 'percentage' ? `${voucher.value}%` : `Rp ${new Intl.NumberFormat('id-ID').format(voucher.value)}`}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    <div className="flex">
                                                        <span className="text-xs">{formatDate(voucher.start_date)}</span>
                                                        <span className="text-gray-400 text-xs px-1"> - </span>
                                                        <span className="text-xs">{formatDate(voucher.end_date)}</span>
                                                    </div>
                                                </td>
                                                <td className="py-2 whitespace-nowrap text-xs font-base">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${voucher.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${voucher.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                        {voucher.is_active ? 'Aktif' : 'Nonaktif'}
                                                    </span>
                                                </td>
                                                <td className="pr-5 py-2 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => openEditModal(voucher)}
                                                            className="text-cyan-600 hover:text-cyan-900 bg-cyan-50 hover:bg-cyan-100 p-2 rounded-lg transition-all cursor-pointer"
                                                            title="Ubah"
                                                        >
                                                            <FontAwesomeIcon icon={faPencil} />
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDelete(voucher.id)}
                                                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-all cursor-pointer"
                                                            title="Hapus"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center text-gray-500 italic">
                                                Tidak ada voucher ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination links={vouchers.links} from={vouchers.from} to={vouchers.to} total={vouchers.total} />
                </div>

                <VoucherModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    editData={editData}
                    insurances={insurances}
                />

                <ConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                    title="Konfirmasi Hapus"
                    message="Apakah Anda yakin ingin menghapus voucher ini? Tindakan ini tidak dapat dibatalkan."
                    confirmText="Ya, Hapus"
                    icon={faTrash}
                    processing={deleting}
                />
            </MainLayout>
        </>
    );
}
