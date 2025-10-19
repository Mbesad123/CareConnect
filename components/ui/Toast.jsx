'use client'

import clsx from 'clsx'

const variants = {
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  error: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
  info: 'border-sky-500/40 bg-sky-500/10 text-sky-200',
}

export default function Toast({ type = 'info', children }) {
  return (
    <div className={clsx('rounded-2xl border px-4 py-3 text-sm font-medium shadow-lg shadow-slate-950/30', variants[type])}>
      {children}
    </div>
  )
}
