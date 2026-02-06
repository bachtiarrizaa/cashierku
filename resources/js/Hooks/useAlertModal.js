import { useState, useCallback } from 'react'

const DEFAULT_DURATION = 2500
export function useAlertModal(duration = DEFAULT_DURATION) {
  const [state, setState] = useState({
    isOpen: false,
    type: 'info',
    title: 'Informasi',
    message: '',
    duration,
  })

  const onClose = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const show = useCallback(
    (type, title, message = '') => {
      setState({
        isOpen: true,
        type,
        title,
        message,
        duration,
      })
    },
    [duration]
  )

  const showSuccess = useCallback(
    (message, title = 'Berhasil') => {
      show('success', title, message)
    },
    [show]
  )

  const showError = useCallback(
    (message, title = 'Terjadi Kesalahan') => {
      show('error', title, message)
    },
    [show]
  )

  const showWarning = useCallback(
    (message, title = 'Perhatian') => {
      show('warning', title, message)
    },
    [show]
  )

  const showInfo = useCallback(
    (message, title = 'Informasi') => {
      show('info', title, message)
    },
    [show]
  )

  return {
    alert: {
      ...state,
      onClose,
      duration: state.duration ?? duration,
    },
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
