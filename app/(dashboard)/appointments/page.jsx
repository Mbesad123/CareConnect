import Link from 'next/link'
import { listAppointments } from './lib/appointmentUtils'
import SectionTitle from '@/components/layout/SectionTitle'
import PageContainer from '@/components/layout/PageContainer'
import Table from '@/components/ui/Table'

export default function AppointmentsPage() {
  const appointments = listAppointments()

  return (
    <PageContainer className="space-y-12">
      <SectionTitle
        eyebrow="Scheduling"
        title="Appointments"
        description="Optimize clinic throughput with a consolidated agenda."
      />
      <Table
        columns={['Patient', 'Reason', 'Date', 'Time', 'Clinician', 'Status']}
        data={appointments.map(({ id, patient, reason, date, time, clinician, status }) => [
          <Link key={id} href={`/dashboard/appointments/${id}`} className="font-medium text-sky-300">
            {patient}
          </Link>,
          reason,
          date,
          time,
          clinician,
          status,
        ])}
      />
    </PageContainer>
  )
}
