'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CalendarClock,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Appointments', href: '/appointments', icon: CalendarClock },
  { name: 'Reports', href: '/reports', icon: FileBarChart2 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden h-full w-full max-w-xs flex-col border-r border-slate-200/80 bg-white/60 px-6 py-8 shadow-2xl shadow-slate-900/5 backdrop-blur-2xl lg:flex">
      <Link href="/" className="mb-8 block">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-card">
            CC
          </span>
          <div>
            <p className="text-lg font-semibold text-slate-900">CareConnect</p>
            <p className="text-xs text-slate-500">Clinical command center</p>
          </div>
        </div>
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-primary-600 text-white shadow-card shadow-primary-600/20'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <button className="mt-8 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
      <p className="mt-4 text-xs text-slate-400">Secure & HIPAA ready</p>
    </aside>
  )
}
