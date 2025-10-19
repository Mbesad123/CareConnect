import clsx from 'clsx'

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const variantStyles = {
  primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600',
  secondary:
    'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:outline-slate-400 border border-slate-200',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-300',
  outline:
    'border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:outline-slate-400',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
