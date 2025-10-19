'use client'

import Button from '../../components/ui/Button'

export default function DashboardError({ error, reset }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-900/95 p-6 text-center text-white">
      <div className="max-w-lg rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-200">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-semibold">We could not load your dashboard</h1>
        <p className="mt-2 text-sm text-slate-200/80">
          {error?.message ?? 'An unexpected error occurred. Try refreshing the page or contact support if the issue persists.'}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="secondary" onClick={() => reset?.()}>
            Try again
          </Button>
          <Button variant="ghost" className="text-white" onClick={() => (window.location.href = '/')}>Go home</Button>
        </div>
      </div>
    </div>
  )
}
