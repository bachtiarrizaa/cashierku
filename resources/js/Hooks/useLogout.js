import { useState } from "react";

export default function useLogout() {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    console.log("Logout clicked");
    setShowModal(false);
  };

  const openLogoutModal = () => setShowModal(true);
  const closeLogoutModal = () => setShowModal(false);

  return {
    showModal,
    openLogoutModal,
    closeLogoutModal,
    handleLogout,
  };
}