'use client'

import clsx from 'clsx'

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
}

export default function LoadingSpinner({ label, size = 'md' }) {
  return (
    <div className="flex items-center gap-2 text-slate-300">
      <span className={clsx('inline-flex animate-spin rounded-full border-2 border-slate-200/60 border-t-transparent', sizes[size])} />
      {label && <span className="text-xs uppercase tracking-widest text-slate-400">{label}</span>}
    </div>
  )
}
