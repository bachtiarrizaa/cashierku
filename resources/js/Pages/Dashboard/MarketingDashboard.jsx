import MainLayout from "../../Layouts/MainLayout";
import { Head } from '@inertiajs/react';

export default function MarketingDashboard() {
    return (
        <>
            <Head title="Marketing Dashboard" />
            <MainLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Marketing Dashboard</h1>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome back, Marketing Team! Check out the latest campaign stats.
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}
