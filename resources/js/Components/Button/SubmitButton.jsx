export function SubmitButton({ children, onClick, className = '' }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize
        transition bg-cyan-600 rounded-lg hover:bg-cyan-600/85
        focus:outline-none focus:ring focus:ring-cyan-300 focus:ring-opacity-50 cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}
