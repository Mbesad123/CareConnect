import '../globals.css'
import './styles.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-grid">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <main className="relative overflow-y-auto px-6 pb-12 pt-6 sm:px-10">{children}</main>
      </div>
    </div>
  )
}
