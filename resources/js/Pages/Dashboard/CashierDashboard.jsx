import MainLayout from "../../Layouts/MainLayout";
import { Head } from '@inertiajs/react';

export default function CashierDashboard() {
    return (
        <>
            <Head title="Cashier Dashboard" />
            <MainLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Cashier Dashboard</h1>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome back, Cashier! Ready to process transactions?
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}
