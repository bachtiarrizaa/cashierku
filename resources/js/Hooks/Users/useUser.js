import { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';

const BASE_URL = '/users';

export function useUser(filters = {}) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { delete: destroy, processing: deleting } = useForm();

    useEffect(() => {
        if (search === (filters.search ?? '')) return;
        const timer = setTimeout(() => {
            router.get(BASE_URL, { search: search || undefined }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(timer);
    }, [search, filters.search]);

    const openCreateModal = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditData(item);
        setIsModalOpen(true);
    };

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
