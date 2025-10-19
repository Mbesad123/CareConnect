import clsx from 'clsx'

const baseStyles =
  'block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400'

export default function Input({ label, description, error, className, ...props }) {
  return (
    <label className="flex w-full flex-col gap-1">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <input className={clsx(baseStyles, className, error && 'border-red-400 focus:border-red-400 focus:ring-red-100')} {...props} />
      {description && !error && (
        <span className="text-xs text-slate-500">{description}</span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}
