import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Ya, Lanjutkan",
    cancelText = "Batal",
    icon,
    confirmButtonColor = "bg-red-600 hover:bg-red-500",
    iconColor = "text-red-600",
    processing = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">

                <div className="relative inline-block bg-white rounded-lg shadow-xl sm:max-w-sm sm:w-full p-6 align-middle transition-all transform">
                    <div className="flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={icon}
                            className={iconColor}
                            size="xl"
                        />
                    </div>

                    <div className="my-3 text-center">
                        <h3 className="text-sm font-bold text-gray-800">
                            {title}
                        </h3>
                        <p className="mt-2 text-xs text-gray-500">
                            {message}
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={processing}
                            className={`flex-1 px-4 py-2 text-xs font-medium text-white ${confirmButtonColor} rounded-md cursor-pointer transition-colors disabled:opacity-50`}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Memproses...
                                </span>
                            ) : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
