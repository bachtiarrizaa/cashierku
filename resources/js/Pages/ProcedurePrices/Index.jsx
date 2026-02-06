import MainLayout from "../../Layouts/MainLayout";
import { Head } from '@inertiajs/react';
import Pagination from "../../Components/Pagination";
import { router } from '@inertiajs/react';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Index({ prices, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        if ((filters.search || '') === search) {
            return;
        }

        const timer = setTimeout(() => {
            router.get(
                '/procedure-prices',
                { search: search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <>
            <Head title="Procedure Prices" />
            <MainLayout>
                <div className="px-4 py-1">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Procedure Prices</h1>
                        <div className="relative flex items-center mt-4 md:mt-0">
                            <span className="absolute">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 mx-3 text-gray-400" />
                            </span>

                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-cyan-600 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procedure Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {prices.data.length > 0 ? (
                                        prices.data.map((price, index) => (
                                            <tr key={price.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1 + (prices.current_page - 1) * prices.per_page}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{price.procedure?.name || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">RP {Number(price.unit_price).toLocaleString('id-ID')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(price.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(price.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                No procedure prices found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination links={prices.links} from={prices.from} to={prices.to} total={prices.total} />
                </div>
            </MainLayout>
        </>
    )
}
