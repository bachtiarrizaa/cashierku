import { useState } from "react";
import { usePage } from "@inertiajs/react";
import MenuItem from "./MenuItem";
import LogoutButton from "./Button/LogoutButton";
import useLogout from "../Hooks/Auth/useLogout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faRightFromBracket,
  faLink,
  faReceipt,
  faShieldHalved,
  faStethoscope,
  faTags,
  faTicket,
  faUser,
  faChartArea,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const { showModal, openLogoutModal, closeLogoutModal, handleLogout } = useLogout();
  const role = usePage().props?.auth?.user?.role?.name ?? "";

  const dashboardUrl =
    role === "admin"
      ? "/admin/dashboard"
      : role === "marketing"
        ? "/marketing/dashboard"
        : role === "cashier"
          ? "/cashier/dashboard"
          : "/";

  const canAccessVoucher = role === "admin" || role === "marketing";
  const canAccessUser = role === "admin";

  return (
    <div
      className={`flex flex-col min-h-full px-3 pt-1 pb-6 bg-white border-r border-r-gray-200 transition-all duration-300 ${isOpen ? "w-56" : "w-16"
        }`}
    >
      <div className="flex flex-col justify-between flex-1">
        <nav className="space-y-3">
          <div className="px-3 flex items-center justify-between py-2 text-gray-600 border-b border-b-gray-200">
            {isOpen && (
              <div className="flex items-center justify-center transition-opacity duration-300">
                <span className="font-bold text-xl">Menu</span>
              </div>
            )}
            <button onClick={toggleSidebar} className="cursor-pointer">
              <FontAwesomeIcon
                icon={faAnglesRight}
                className={`transition-transform duration-300 cursor-pointer ${!isOpen ? "rotate-180 py-1" : ""}`}
              />
            </button>
          </div>

          <div>
            <MenuItem
              icon={faChartArea}
              label="Dashboard"
              isOpen={isOpen}
              to={dashboardUrl}
            />

            {canAccessUser && (
              <MenuItem
                icon={faUser}
                label="User"
                isOpen={isOpen}
                to="/users"
              />
            )}

            <MenuItem
              icon={faReceipt}
              label="Transaksi"
              isOpen={isOpen}
              to="/transactions"
            />

            <MenuItem
              icon={faShieldHalved}
              label="Asuransi"
              isOpen={isOpen}
              to="/insurances"
            />

            <MenuItem
              icon={faStethoscope}
              label="Tindakan"
              isOpen={isOpen}
              to="/procedures"
            />

            <MenuItem
              icon={faTags}
              label="Harga Tindakan"
              isOpen={isOpen}
              to="/procedure-prices"
            />

            {canAccessVoucher && (
              <>
                <MenuItem
                  icon={faTicket}
                  label="Voucher"
                  isOpen={isOpen}
                  to="/vouchers"
                />
                <MenuItem
                  icon={faLink}
                  label="Voucher Tindakan"
                  isOpen={isOpen}
                  to="/voucher-procedures"
                />
              </>
            )}
          </div>
        </nav>

        <div className="mt-12">
          <LogoutButton
            icon={faRightFromBracket}
            label="Keluar"
            isOpen={isOpen}
            onClick={openLogoutModal}
          />
        </div>

        {showModal && (
          <div className="fixed inset-0 z-10">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
              <div className="inline-block bg-white rounded-lg shadow-xl sm:max-w-sm sm:w-full p-6">
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-red-600"
                    size="xl"
                  />
                </div>
                <div className="my-3 text-center">
                  <h3 className="text-base font-medium text-gray-800">Konfirmasi Keluar</h3>
                  <p className="mt-2 text-xs text-gray-500">
                    Apakah kamu yakin ingin keluar dari akun ini?
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={closeLogoutModal}
                    className="px-4 py-2 mt-2 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 mt-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 cursor-pointer"
                  >
                    Ya, Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
