import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogoutButton({ icon, label, isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center w-full px-3 py-2 rounded-lg transition-colors duration-300 cursor-pointer 
                 text-red-600 hover:bg-red-100 hover:text-red-700"
    >
      <FontAwesomeIcon icon={icon} className="min-w-[20px] text-center" />
      <span
        className={`ml-2 text-sm whitespace-nowrap transition-all duration-300 font-semibold ${
          isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        {label}
      </span>
    </button>
  );
}