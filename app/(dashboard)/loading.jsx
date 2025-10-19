import LoadingSpinner from '@/components/feedback/LoadingSpinner'

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900/90">
      <LoadingSpinner label="Preparing your workspace" />
    </div>
  )
}
