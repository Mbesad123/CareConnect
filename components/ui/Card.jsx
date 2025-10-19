'use client'

import clsx from 'clsx'

export default function Card({ title, value, trend, trendLabel, className }) {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-sky-500/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/10',
        className
      )}
    >
      <p className="text-xs uppercase tracking-wider text-slate-500">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-3xl font-semibold text-slate-100">{value}</p>
        {trend && (
          <p className="text-sm font-medium text-emerald-300">
            {trend}
            {trendLabel && <span className="ml-1 text-xs text-slate-400">{trendLabel}</span>}
          </p>
        )}
      </div>
    </div>
  )
}
