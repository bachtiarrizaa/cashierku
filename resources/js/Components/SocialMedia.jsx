import React from 'react'

export function SocialMedia({ href, children }) {
  return (
    <a
      href={href}
      className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-cyan-600"
    >
      {children}
    </a>
  )
}
