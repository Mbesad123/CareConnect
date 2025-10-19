'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, FileText, Home, LogOut, Settings, Users } from 'lucide-react'
import Button from '@/components/ui/Button'

const navigation = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/patients', label: 'Patients', icon: Users },
  { href: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname()

  return (
    <aside className={`dashboard-sidebar ${open ? 'dashboard-sidebar--open' : ''}`}>
      <div className="dashboard-sidebar__header">
        <Link href="/" className="dashboard-sidebar__logo">
          <span className="text-sky-400">Care</span>Connect
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="dashboard-sidebar__close"
          aria-label="Close navigation"
        >
          ×
        </button>
      </div>
      <nav className="dashboard-sidebar__nav">
        {navigation.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link key={href} href={href} className={`dashboard-sidebar__link ${active ? 'is-active' : ''}`}>
              <Icon className="h-5 w-5" aria-hidden />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto space-y-4 p-4">
        <Button variant="secondary" className="w-full" href="/">
          Back to marketing site
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <LogOut className="h-5 w-5" />
          Sign out
        </Button>
      </div>
    </aside>
  )
}
