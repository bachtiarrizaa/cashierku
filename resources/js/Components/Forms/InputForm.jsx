import React from 'react'

export function InputForm({ type, name ,value, placeholder, onChange, icon }) {
  return (
    <div className="relative flex items-center">
      {icon && <span className="absolute">{icon}</span>}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full py-3 text-gray-700 bg-white border border-gray-300 rounded-lg px-11
          focus:ring-cyan-600 focus:outline-none focus:ring focus:ring-opacity-40`}
      />
    </div>
  )
}