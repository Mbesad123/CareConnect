import PageContainer from '@/components/layout/PageContainer'
import AppointmentDetailView from '../components/AppointmentDetailView'
import { getAppointmentById } from '../lib/appointmentUtils'
import { notFound } from 'next/navigation'

export default function AppointmentDetailPage({ params }) {
  const appointment = getAppointmentById(params.id)

  if (!appointment) {
    notFound()
  }

  return (
    <PageContainer>
      <AppointmentDetailView appointment={appointment} />
    </PageContainer>
  )
}
