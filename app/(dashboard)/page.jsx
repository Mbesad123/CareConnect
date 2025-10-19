import DashboardShell from './components/DashboardShell'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/layout/SectionTitle'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { getCareTeamHighlights, getKpis, getUpcomingAppointments } from './lib/dashboardUtils'

export default function DashboardPage() {
  const kpis = getKpis()
  const appointments = getUpcomingAppointments()
  const highlights = getCareTeamHighlights()

  return (
    <DashboardShell
      title="Clinical operations overview"
      description="Monitor the health of your practice, collaborate with your care team, and keep every patient on track."
      actions={<Button variant="primary">Add patient</Button>}
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <article
            key={kpi.id}
            className="rounded-3xl border border-white/80 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-card"
          >
            <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{kpi.value}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-widest text-primary-500">{kpi.change}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionTitle
            title="Upcoming appointments"
            subtitle="Stay ahead of your schedule and prepare your team for each encounter."
            actions={<Button variant="secondary">View calendar</Button>}
          />
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="font-medium text-slate-900">{appointment.patient.fullName}</div>
                    <p className="text-xs text-slate-500">{appointment.type}</p>
                  </TableCell>
                  <TableCell className="text-slate-600">{appointment.provider}</TableCell>
                  <TableCell className="text-slate-600">{appointment.dateLabel}</TableCell>
                  <TableCell className="text-slate-600">{appointment.timeLabel}</TableCell>
                  <TableCell>
                    <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                      {appointment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="rounded-3xl border border-slate-200/60 bg-gradient-to-b from-white to-slate-50 p-6 shadow-card">
          <SectionTitle title="Care team highlights" subtitle="Celebrate wins and spot opportunities." />
          <ul className="mt-4 space-y-5 text-sm text-slate-600">
            {highlights.map((highlight) => (
              <li key={highlight.id} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4">
                <p className="text-sm font-semibold text-slate-900">{highlight.title}</p>
                <p className="mt-2 text-sm text-slate-500">{highlight.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </DashboardShell>
  )
}
