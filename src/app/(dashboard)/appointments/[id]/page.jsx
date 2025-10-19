import { notFound } from 'next/navigation'
import DashboardShell from '../../components/DashboardShell'
import Button from '../../../../components/ui/Button'
import { formatDate, formatTime } from '../../../../lib/utils'
import { getAppointmentById } from '../lib/appointmentUtils'
import { getPatientById } from '../../patients/lib/patientUtils'

export default function AppointmentDetailPage({ params }) {
  const appointment = getAppointmentById(params.id)

  if (!appointment) {
    notFound()
  }

  const patient = getPatientById(appointment.patientId)

  return (
    <DashboardShell
      title={`${appointment.type} with ${appointment.provider}`}
      description={`Scheduled for ${formatDate(appointment.date)} at ${formatTime(appointment.time)}.`}
      actions={<Button variant="secondary">Send reminder</Button>}
    >
      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Appointment details</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Patient</dt>
              <dd className="text-sm text-slate-700">{patient?.fullName ?? appointment.patientId}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Provider</dt>
              <dd className="text-sm text-slate-700">{appointment.provider}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Location</dt>
              <dd className="text-sm text-slate-700">{appointment.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Status</dt>
              <dd className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                {appointment.status}
              </dd>
            </div>
          </dl>
          <div className="mt-6 rounded-2xl border border-slate-200/60 bg-white/80 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Notes</h3>
            <p className="mt-2 text-sm text-slate-600">{appointment.notes || 'No pre-visit notes captured yet.'}</p>
          </div>
        </article>
        <aside className="rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900">Patient contact</h3>
          <p className="mt-2 text-sm text-slate-600">
            {patient
              ? `${patient.fullName} • ${patient.phone} • ${patient.email}`
              : 'Patient record not found in the directory.'}
          </p>
          <Button variant="ghost" className="mt-6 w-full justify-center">
            Open patient chart
          </Button>
        </aside>
      </section>
    </DashboardShell>
  )
}
