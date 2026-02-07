import MainLayout from "../../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Pagination from "../../Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useProcedures } from "../../Hooks/Procedures/useProcedures";

export default function Index({ procedures, filters = {} }) {
    const { search, setSearch } = useProcedures(filters);

    return (
        <>
            <Head title="Tindakan" />
            <MainLayout>
                <div className="px-2 py-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-4">
                        <h1 className="text-xl font-bold text-gray-700">Data Tindakan</h1>
                        <div className="relative flex items-center mt-4 md:mt-0">
                            <span className="absolute">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 mx-3 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Cari tindakan..."
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
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 tracking-wider">Nama Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {procedures.data.length > 0 ? (
                                        procedures.data.map((procedure, index) => (
                                            <tr key={procedure.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {index + 1 + (procedures.current_page - 1) * procedures.per_page}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-600">
                                                    {procedure.name}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="px-6 py-12 text-center text-gray-500 italic">
                                                Tidak ada tindakan ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination links={procedures.links} from={procedures.from} to={procedures.to} total={procedures.total} />
                </div>
            </MainLayout>
        </>
    );
}
