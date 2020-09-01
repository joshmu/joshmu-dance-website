import React from 'react'

export default function LineAccent({ center = false }) {
  return (
    <div
      className={`flex flex-col justify-center w-full ${
        center && 'items-center'
      }`}
    >
      <div className='w-12 h-0.5 bg-themeAccent opacity-75'></div>
      <div className='w-8 h-0.5 bg-themeAccent mt-1 opacity-50'></div>
    </div>
  )
}
