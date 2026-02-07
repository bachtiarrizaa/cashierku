import MainLayout from "../../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Pagination from "../../Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import UserModal from "../../Components/Modals/UserModal";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import { useUser } from "../../Hooks/Users/useUser";

export default function Index({ users, roles, filters = {} }) {
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
    } = useUser(filters);

    return (
        <>
            <Head title="User" />
            <MainLayout>
                <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-4">
                        <h1 className="text-xl font-bold text-gray-700">Manajemen User</h1>
                        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                            <div className="relative flex items-center w-full md:w-60">
                                <span className="absolute">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs mx-3 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari nama / email..."
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
                                <span>Tambah User</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">No</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Nama</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data?.length > 0 ? (
                                        users.data.map((user, index) => (
                                            <tr key={user.id}>
                                                <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {index + 1 + (users.current_page - 1) * users.per_page}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-700">{user.name}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">{user.email}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-xs">
                                                    <span className="px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-700 capitalize">
                                                        {user.role?.name}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => openEditModal(user)}
                                                            className="text-cyan-600 hover:text-cyan-900 bg-cyan-50 hover:bg-cyan-100 p-2 rounded-lg transition-all cursor-pointer"
                                                            title="Ubah"
                                                        >
                                                            <FontAwesomeIcon icon={faPencil} />
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDelete(user.id)}
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
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                                                Tidak ada user ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination
                        links={users.links}
                        from={users.from ?? 0}
                        to={users.to ?? 0}
                        total={users.total ?? 0}
                    />
                </div>

                <UserModal isOpen={isModalOpen} onClose={closeModal} editData={editData} roles={roles} />

                <ConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                    title="Konfirmasi Hapus"
                    message="Apakah Anda yakin ingin menghapus user ini?"
                    confirmText="Ya, Hapus"
                    icon={faTrash}
                    processing={deleting}
                />
            </MainLayout>
        </>
    );
}
