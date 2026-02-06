import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function MenuItemWithDropdown({ icon, label, isOpen, isBold, submenu }) {
  const [open, setOpen] = useState(false);
  const { url } = usePage();

  const isAnySubmenuActive = submenu.some((item) => url.startsWith(item.to));

  return (
    <div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${isAnySubmenuActive
          ? "bg-cyan-100 text-cyan-600"
          : "text-gray-800 hover:bg-gray-100 hover:text-cyan-600"
          }`}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={icon} className="min-w-[20px] text-center" />
          <span
            className={`ml-2 text-sm whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
              } ${isBold ? "font-bold" : "font-semibold"}`}
          >
            {label}
          </span>
        </div>

        <FontAwesomeIcon
          icon={faAngleDown}
          className={`transition-all duration-300 ${open ? "rotate-180" : ""
            } ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
        />
      </div>

      <div
        className={`ml-8 flex flex-col overflow-hidden transition-all duration-300 ${open || isAnySubmenuActive ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        {submenu.map((item, idx) => {
          const isSubActive = url === item.to;
          return (
            <Link
              key={idx}
              href={item.to}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors duration-200 cursor-pointer ${isSubActive
                ? "text-cyan-600 font-bold"
                : "text-gray-600 hover:text-cyan-600"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}