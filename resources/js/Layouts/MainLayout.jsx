import Navbar from "../Components/Navbar";
import Sidebar from "../Components/SideBar";
import { usePage } from "@inertiajs/react";
import { AlertModal } from "../Components/Modals/AlertModal";
import { useState, useEffect } from "react";

export default function MainLayout({ children }) {
  const { flash } = usePage().props;
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: ""
  });

  useEffect(() => {
    if (flash?.success) {
      setAlert({
        isOpen: true,
        type: "success",
        title: "Berhasil!",
        message: flash.success
      });
    } else if (flash?.error) {
      setAlert({
        isOpen: true,
        type: "error",
        title: "Terjadi Kesalahan",
        message: flash.error
      });
    }
  }, [flash]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        <aside className="h-full bg-white">
          <Sidebar />
        </aside>

        <main className="flex-1 h-full overflow-y-auto px-6 pt-4 pb-8 bg-gray-50">
          {children}
        </main>
      </div>

      <AlertModal
        isOpen={alert.isOpen}
        onClose={() => setAlert({ ...alert, isOpen: false })}
        type={alert.type}
        title={alert.title}
        message={alert.message}
      />
    </div>
  );
}