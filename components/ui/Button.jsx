'use client'

import clsx from 'clsx'
import Link from 'next/link'

const variants = {
  primary: 'bg-sky-500 text-slate-50 hover:bg-sky-400 focus-visible:ring-sky-300',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-500',
  ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/60 focus-visible:ring-slate-500',
}

export default function Button({
  href,
  className,
  variant = 'primary',
  loading = false,
  disabled = false,
  children,
  onClick,
  ...props
}) {
  const Component = href ? Link : 'button'
  const componentProps = href ? { href } : { type: props.type ?? 'button' }
  const isDisabled = disabled || loading

  const handleClick = (event) => {
    if (isDisabled) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  const disabledProps = !href ? { disabled: isDisabled } : {}

  return (
    <Component
      {...componentProps}
      {...props}
      {...disabledProps}
      onClick={handleClick}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        className,
        isDisabled && href && 'pointer-events-none opacity-60'
      )}
      aria-disabled={isDisabled ? 'true' : undefined}
      tabIndex={isDisabled && href ? -1 : undefined}
      role={href ? 'button' : undefined}
    >
      {loading && (
        <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-slate-200/80 border-t-transparent" aria-hidden />
      )}
      {children}
    </Component>
  )
}
