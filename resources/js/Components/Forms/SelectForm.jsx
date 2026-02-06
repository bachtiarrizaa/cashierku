export function SelectForm({
  name,
  value,
  onChange,
  icon,
  children,
  error,
}) {
  return (
    <div>
      <div
        className={`flex items-center border rounded-lg px-3 ${
          error
            ? 'border-red-500 focus-within:ring-red-500'
            : 'border-gray-300 focus-within:ring-cyan-600'
        } focus-within:ring`}
      >
        {icon && (
          <div className="text-gray-300 mr-2">
            {icon}
          </div>
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full py-3 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-300"
        >
          {children}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
