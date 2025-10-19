'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Search } from 'lucide-react'
import Button from '../../../components/ui/Button'

const titles = {
  '/': 'Today in your clinic',
  '/patients': 'Patient directory',
  '/appointments': 'Appointments',
  '/reports': 'Reports & analytics',
  '/settings': 'Workspace settings',
}

export default function Navbar() {
  const pathname = usePathname()
  const title = useMemo(() => titles[pathname] ?? 'CareConnect dashboard', [pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-500">Dashboard</p>
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-400 sm:flex">
            <Search className="h-4 w-4" />
            <input
              type="search"
              placeholder="Search patients, notes, or orders"
              className="w-56 border-none bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
            />
          </div>
          <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-700">
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 inline-flex h-2.5 w-2.5 rounded-full bg-primary-500" />
          </button>
          <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
            Quick actions
          </Button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold uppercase text-white">
            LO
          </div>
        </div>
      </div>
    </header>
  )
}
