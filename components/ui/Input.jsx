'use client'

import clsx from 'clsx'
import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { id, label, className, type = 'text', ...props },
  ref
) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-200" htmlFor={id ?? props.name}>
      {label}
      <input
        id={id ?? props.name}
        ref={ref}
        type={type}
        className={clsx(
          'rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-inner shadow-slate-950/30 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60',
          className
        )}
        {...props}
      />
    </label>
  )
})

export default Input
