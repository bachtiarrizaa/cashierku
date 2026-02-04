import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow z-20 h-16">
        <div className="h-full flex items-center justify-between px-6">
          
          <Link
            href="/dashboard"
            className="flex items-center text-2xl font-bold"
          >
            <FontAwesomeIcon
              icon={faChildReaching}
              className="text-cyan-600 text-3xl"
            />

            <span className="flex items-baseline">
              <span className="text-gray-800">Cashier</span>
              <span className="text-cyan-600">.Ku</span>
              <sup className="text-xs text-gray-800 ml-0.5">™</sup>
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <span className="hidden md:inline text-gray-700 font-medium">
              Halo
            </span>

            <button type="button" className="focus:outline-none">
              <div className="w-9 h-9 overflow-hidden border-2 border-gray-400 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}