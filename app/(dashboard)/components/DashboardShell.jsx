'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function DashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-shell__content">
        <Navbar onToggleSidebar={() => setSidebarOpen((previous) => !previous)} />
        <main className="dashboard-shell__main">{children}</main>
      </div>
    </div>
  )
}
