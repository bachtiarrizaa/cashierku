import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const BASE_URL = '/users';

export function useUserModal(isOpen, editData, onClose) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role_id: '',
    });

    useEffect(() => {
        if (!isOpen) return;
        if (editData) {
            setData({
                name: editData.name,
                email: editData.email,
                password: '',
                role_id: editData.role_id,
            });
        } else {
            reset();
        }
    }, [isOpen, editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => { reset(); onClose(); } };
        if (editData) {
            put(`${BASE_URL}/${editData.id}`, options);
        } else {
            post(BASE_URL, options);
        }
    };

    return { data, setData, handleSubmit, processing, errors };
}
