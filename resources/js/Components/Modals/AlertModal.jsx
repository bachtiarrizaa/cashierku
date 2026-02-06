import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'

const variants = {
  success: {
    icon: faCircleCheck,
    barColor: 'bg-emerald-500',
    titleColor: 'text-emerald-500',
  },
  error: {
    icon: faCircleXmark,
    barColor: 'bg-red-500',
    titleColor: 'text-red-500',
  },
  warning: {
    icon: faTriangleExclamation,
    barColor: 'bg-amber-500',
    titleColor: 'text-amber-500',
  },
  info: {
    icon: faCircleInfo,
    barColor: 'bg-blue-500',
    titleColor: 'text-blue-500',
  },
}

export function AlertModal({
  isOpen,
  onClose,
  type = 'info',
  title = 'Informasi',
  message,
  duration = 2000,
}) {
  const { icon, barColor, titleColor } = variants[type] ?? variants.info

  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(onClose, duration)

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, duration])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 px-4">
      <div
        className="absolute inset-0 bg-transparent cursor-pointer"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClose()}
        aria-label="Tutup modal"
      />

      <div
        className="relative flex flex-col w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md"
        role="alertdialog"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
      >
        <div className="flex w-full overflow-hidden">
          <div
            className={`flex items-center justify-center w-12 flex-shrink-0 ${barColor}`}
          >
            <FontAwesomeIcon
              icon={icon}
              className="w-6 h-6 text-white"
            />
          </div>

          <div className="px-4 py-3 -mx-3 flex-1">
            <div className="mx-3">
              <span
                id="alert-title"
                className={`text-xs font-bold ${titleColor}`}
              >
                {title}
              </span>
              {message && (
                <p
                  id="alert-message"
                  className="mt-1 text-xs text-gray-600"
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
