import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export function useVoucherProcedureModal(isOpen, onClose) {
    const { data, setData, post, processing, errors, reset } = useForm({
        voucher_id: '',
        procedure_id: '',
    });

    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/voucher-procedures', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return {
        data,
        setData,
        handleSubmit,
        processing,
        errors,
    };
}
