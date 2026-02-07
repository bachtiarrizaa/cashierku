import { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';

const BASE_URL = '/voucher-procedures';

export function useVoucherProcedure(filters = {}) {
    const [search, setSearch] = useState(filters.search || '');
    const [voucherFilter, setVoucherFilter] = useState(filters.voucher_id || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { delete: destroy, processing: deleting } = useForm();

    useEffect(() => {
        if (search === (filters.search ?? '') && voucherFilter === (filters.voucher_id ?? '')) return;
        const timer = setTimeout(() => {
            router.get(BASE_URL, { search: search || undefined, voucher_id: voucherFilter || undefined }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(timer);
    }, [search, voucherFilter]);

    const openCreateModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDelete = () => {
        destroy(`${BASE_URL}/${deleteId}`, {
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

    return {
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
    };
}
