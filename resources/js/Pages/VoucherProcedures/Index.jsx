import MainLayout from "../../Layouts/MainLayout";
import { Head } from '@inertiajs/react';
import Pagination from "../../Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import VoucherProcedureModal from "../../Components/Modals/VoucherProcedureModal";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import { useVoucherProcedure } from "../../Hooks/VoucherProcedures/useVoucherProcedure";

export default function Index({ voucherProcedures, vouchers, procedures, filters = {} }) {
    const {
        search,
        setSearch,
        voucherFilter,
        setVoucherFilter,
        isModalOpen,
        openCreateModal,
        closeModal,
        isDeleteModalOpen,
        confirmDelete,
        closeDeleteModal,
        handleDelete,
        deleting,
    } = useVoucherProcedure(filters);

    return (
        <>
            <Head title="Voucher Tindakan" />
            <MainLayout>
                <div className="px-2 py-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-4">
                        <h1 className="text-xl font-bold text-gray-700">Voucher & Tindakan Medis</h1>
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
                            <div className="relative flex items-center w-full md:w-48">
                                <span className="absolute">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs mx-3 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari tindakan..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="block w-full py-2 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:border-cyan-600 focus:ring-cyan-200 focus:outline-none focus:ring focus:ring-opacity-40 pl-11 text-sm"
                                />
                            </div>
                            <select
                                value={voucherFilter}
                                onChange={(e) => setVoucherFilter(e.target.value)}
                                className="block w-full md:w-56 py-2 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:border-cyan-600 focus:ring-cyan-200 focus:outline-none"
                            >
                                <option value="">Semua Voucher</option>
                                {vouchers.map((v) => (
                                    <option key={v.id} value={v.id}>{v.name}</option>
                                ))}
                            </select>
                            <button
                                onClick={openCreateModal}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-xs text-white font-semibold border border-cyan-700 rounded-md bg-cyan-600 hover:bg-cyan-700 cursor-pointer transition-colors"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Tambah Relasi</span>
                            </button>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">
                        Tentukan tindakan medis mana yang mendapat diskon dari tiap voucher. Data ini dipakai saat transaksi kasir untuk menghitung diskon otomatis.
                    </p>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="pl-5 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">No</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Voucher</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Tindakan Medis</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {voucherProcedures.data.length > 0 ? (
                                        voucherProcedures.data.map((vp, index) => (
                                            <tr key={vp.id}>
                                                <td className="pl-5 py-2 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {index + 1 + (voucherProcedures.current_page - 1) * voucherProcedures.per_page}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-700">
                                                    {vp.voucher?.name}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {vp.procedure?.name}
                                                </td>
                                                <td className="pr-5 py-2 whitespace-nowrap text-left text-sm font-medium">
                                                    <button
                                                        onClick={() => confirmDelete(vp.id)}
                                                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-all cursor-pointer"
                                                        title="Hapus relasi"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
                                                Belum ada relasi voucher dan tindakan. Klik &quot;Tambah Relasi&quot; untuk menambahkan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination
                        links={voucherProcedures.links}
                        from={voucherProcedures.from}
                        to={voucherProcedures.to}
                        total={voucherProcedures.total}
                    />
                </div>

                <VoucherProcedureModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    vouchers={vouchers}
                    procedures={procedures}
                />

                <ConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                    title="Hapus Relasi"
                    message="Apakah Anda yakin ingin menghapus relasi voucher dan tindakan ini? Tindakan ini tidak dapat dibatalkan."
                    confirmText="Ya, Hapus"
                    icon={faTrash}
                    processing={deleting}
                />
            </MainLayout>
        </>
    );
}
