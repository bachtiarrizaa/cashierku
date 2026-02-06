import { useState } from "react";
import { router } from "@inertiajs/react"; 

export default function useLogout() {
  const [showModal, setShowModal] = useState(false);

  const openLogoutModal = () => setShowModal(true);
  const closeLogoutModal = () => setShowModal(false);

  const handleLogout = () => {
    router.post("/logout", {}, {
      onFinish: () => setShowModal(false),
    });
  };

  return {
    showModal,
    openLogoutModal,
    closeLogoutModal,
    handleLogout,
  };
}