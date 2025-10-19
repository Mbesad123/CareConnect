import { notFound } from 'next/navigation'
import DashboardShell from '@/app/(dashboard)/components/DashboardShell'
import Button from '@/components/ui/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { formatDate } from '@/lib/utils'
import { getPatientById } from '../lib/patientUtils'

export default function PatientDetailPage({ params }) {
  const patient = getPatientById(params.id)

  if (!patient) {
    notFound()
  }

  const encounters = [
    {
      id: 'enc-1',
      date: '2024-02-12',
      summary: 'Diabetes follow-up appointment',
      outcome: 'Adjusted medication dosage and scheduled nutrition consult.',
    },
    {
      id: 'enc-2',
      date: '2023-11-04',
      summary: 'Annual wellness visit',
      outcome: 'Reviewed lifestyle goals and preventive screenings.',
    },
  ]

  return (
    <DashboardShell
      title={patient.fullName}
      description={`Managed by ${patient.primaryPhysician}. Last visit ${formatDate(patient.lastVisit)}.`}
      actions={<Button variant="secondary">Share chart</Button>}
    >
      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Care summary</h2>
          <p className="mt-2 text-sm text-slate-500">Keep the entire care team aligned with the latest insights.</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Email</dt>
              <dd className="text-sm text-slate-700">{patient.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Phone</dt>
              <dd className="text-sm text-slate-700">{patient.phone}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Date of birth</dt>
              <dd className="text-sm text-slate-700">{formatDate(patient.dateOfBirth)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Gender</dt>
              <dd className="text-sm text-slate-700">{patient.gender}</dd>
            </div>
          </dl>
          <div className="mt-6 rounded-2xl border border-slate-200/60 bg-white/80 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Notes</h3>
            <p className="mt-2 text-sm text-slate-600">{patient.notes || 'No notes recorded yet.'}</p>
          </div>
        </article>
        <aside className="rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900">Care team</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-2xl border border-slate-200 bg-white/70 p-4">
              <p className="font-semibold text-slate-900">{patient.primaryPhysician}</p>
              <p className="text-xs uppercase tracking-widest text-slate-400">Primary physician</p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white/70 p-4">
              <p className="font-semibold text-slate-900">Jasmine Young, RN</p>
              <p className="text-xs uppercase tracking-widest text-slate-400">Care coordinator</p>
            </li>
          </ul>
        </aside>
      </section>

      <section className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card">
        <h2 className="text-lg font-semibold text-slate-900">Encounters</h2>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {encounters.map((encounter) => (
              <TableRow key={encounter.id}>
                <TableCell className="text-slate-600">{formatDate(encounter.date)}</TableCell>
                <TableCell className="text-slate-600">{encounter.summary}</TableCell>
                <TableCell className="text-slate-600">{encounter.outcome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </DashboardShell>
  )
}
