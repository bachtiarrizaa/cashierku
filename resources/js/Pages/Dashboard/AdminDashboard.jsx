import MainLayout from "../../Layouts/MainLayout";
import { Head } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <MainLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome back, Admin! Here you can manage users, settings, and view reports.
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}
