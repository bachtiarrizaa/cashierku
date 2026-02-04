import { Link, usePage } from "@inertiajs/react"; // Gunakan Link dan usePage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuItem({ icon, label, isOpen, to }) {
  const { url } = usePage();
  const isActive = url === to;

  return (
    <Link
      href={to}
      className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 cursor-pointer ${
        isActive
          ? "text-cyan-600 bg-gray-100"
          : "text-gray-800 hover:bg-gray-100 hover:text-cyan-600"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="min-w-[20px] text-center" />
      <span
        className={`ml-2 text-sm whitespace-nowrap transition-all duration-300 font-semibold ${
          isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}