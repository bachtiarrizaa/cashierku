import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
export function useVoucherModal(isOpen, editData, onClose) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        insurance_id: '',
        name: '',
        type: 'percentage',
        value: '',
        max_discount: '',
        start_date: '',
        end_date: '',
        is_active: true,
    });

    useEffect(() => {
        if (isOpen) {
            if (editData) {
                setData({
                    insurance_id: editData.insurance_id,
                    name: editData.name,
                    type: editData.type,
                    value: editData.value,
                    max_discount: editData.max_discount || '',
                    start_date: editData.start_date,
                    end_date: editData.end_date,
                    is_active: !!editData.is_active,
                });
            } else {
                reset();
            }
        }
    }, [isOpen, editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                reset();
                onClose();
            },
        };

        if (editData) {
            put(`/vouchers/${editData.id}`, options);
        } else {
            post('/vouchers', options);
        }
    };

    return {
        data,
        setData,
        handleSubmit,
        processing,
        errors,
    };
}
