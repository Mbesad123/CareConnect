export default function LoadingSpinner({ label = 'Loading' }) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-primary-600 shadow-card">
      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      {label}
    </div>
  )
}
