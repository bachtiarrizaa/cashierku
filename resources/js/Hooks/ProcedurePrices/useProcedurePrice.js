import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export function useProcedurePrice(filters = {}) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        if (search === (filters.search ?? '')) return;
        const timer = setTimeout(() => {
            router.get('/procedure-prices', { search: search || undefined }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(timer);
    }, [search, filters.search]);

    return { search, setSearch };
}
