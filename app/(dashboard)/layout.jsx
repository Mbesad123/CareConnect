import './styles/styles.css'
import DashboardShell from './components/DashboardShell'

export const metadata = {
  title: 'CareConnect Dashboard',
  description: 'Comprehensive overview of your clinical operations.',
}

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>
}
