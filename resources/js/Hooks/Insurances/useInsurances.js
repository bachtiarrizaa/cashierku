import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export function useInsurances(filters = {}) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        if ((filters.search || '') === search) {
            return;
        }

        const timer = setTimeout(() => {
            router.get(
                '/insurances',
                { search: search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, filters.search]);

    return {
        search,
        setSearch,
    };
}
