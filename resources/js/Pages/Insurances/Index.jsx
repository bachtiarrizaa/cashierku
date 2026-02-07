import MainLayout from "../../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Pagination from "../../Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useInsurances } from "../../Hooks/Insurances/useInsurances";

export default function Index({ insurances, filters = {} }) {
    const { search, setSearch } = useInsurances(filters);

    return (
        <>
            <Head title="Asuransi" />
            <MainLayout>
                <div className="px-2 py-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-4">
                        <h1 className="text-xl font-bold text-gray-700">Data Asuransi</h1>
                        <div className="relative flex items-center mt-4 md:mt-0">
                            <span className="absolute">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 mx-3 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Cari asuransi..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full py-2 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:border-cyan-600 focus:ring-cyan-200 focus:outline-none focus:ring focus:ring-opacity-40 pl-11 text-sm"
                            />
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 tracking-wider">No</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 tracking-wider">Nama Asuransi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {insurances.data.length > 0 ? (
                                        insurances.data.map((insurance, index) => (
                                            <tr key={insurance.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {index + 1 + (insurances.current_page - 1) * insurances.per_page}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {insurance.name}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="px-6 py-12 text-center text-gray-500 italic">
                                                Tidak ada asuransi ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination links={insurances.links} from={insurances.from} to={insurances.to} total={insurances.total} />
                </div>
            </MainLayout>
        </>
    );
}
