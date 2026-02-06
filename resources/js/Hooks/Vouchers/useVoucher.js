import { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
export function useVoucher(filters = {}) {
    const [search, setSearch] = useState(filters.search || '');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { delete: destroy, processing: deleting } = useForm();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get('/vouchers', { search }, { preserveState: true, replace: true });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [search, filters.search]);

    const openCreateModal = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (voucher) => {
        setEditData(voucher);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = () => {
        destroy(`/vouchers/${deleteId}`, {
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

    return {
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
    };
}
