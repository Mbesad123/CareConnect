'use client'

import Button from '@/components/ui/Button'

export default function DashboardError({ error, reset }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-wider text-slate-500">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-100">We couldn&apos;t load your dashboard</h1>
        <p className="mt-3 max-w-xl text-sm text-slate-400">
          {error?.message ?? 'An unexpected error occurred. Please try again or contact support if the issue persists.'}
        </p>
      </div>
      <Button onClick={() => reset?.()}>Retry</Button>
    </div>
  )
}
