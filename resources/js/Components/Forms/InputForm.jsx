import React from 'react'

export function InputForm({ type, name, value, placeholder, onChange, icon, error, required, ...rest }) {
  return (
    <div>
      <div className={`relative flex items-center border rounded-lg overflow-hidden ${error
        ? 'border-red-500 focus-within:ring-red-500'
        : 'border-gray-300 focus-within:ring-cyan-600'
        } focus-within:ring`}>
        {icon && <span className="absolute">{icon}</span>}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full py-3 text-gray-700 bg-white focus:outline-none px-11 focus:ring-opacity-40"
          {...rest}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}