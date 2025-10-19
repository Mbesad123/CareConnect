'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/feedback/LoadingSpinner'

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="dashboard-navbar">
      <div className="flex items-center gap-3">
        <Button variant="ghost" className="lg:hidden" onClick={onToggleSidebar} aria-label="Toggle navigation">
          ☰
        </Button>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Today&apos;s schedule</p>
          <p className="font-semibold text-slate-100">10 appointments • 4 follow-ups</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <LoadingSpinner label="Syncing" size="sm" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-100">Dr. Taylor Ramirez</p>
            <p className="text-xs text-slate-400">Medical Director</p>
          </div>
          <Image src="/avatar.svg" alt="Team avatar" width={36} height={36} className="rounded-full bg-slate-800" />
        </div>
      </div>
    </header>
  )
}
