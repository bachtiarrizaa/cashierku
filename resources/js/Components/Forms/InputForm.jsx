import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export function InputForm({ type, name, value, placeholder, onChange, icon, error, required, showPasswordToggle, ...rest }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPasswordToggle && showPassword ? 'text' : type

  return (
    <div>
      <div className={`relative flex items-center border rounded-lg overflow-hidden ${
        error
          ? 'border-red-500 focus-within:ring-red-500'
          : 'border-gray-300 focus-within:ring-cyan-600'
      } focus-within:ring`}>
        {icon && <span className="absolute left-0">{icon}</span>}

        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`block w-full py-3 text-gray-700 bg-white focus:outline-none focus:ring-opacity-40 ${icon ? 'pl-11' : 'pl-3'} ${showPasswordToggle && isPassword ? 'pr-11' : 'pr-3'}`}
          {...rest}
        />

        {showPasswordToggle && isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 px-3 py-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-5 h-5" />
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}