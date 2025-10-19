'use client'

import { useState } from 'react'
import SectionTitle from '@/components/layout/SectionTitle'
import Card from '@/components/ui/Card'
import AppointmentActions from './AppointmentActions'

export default function AppointmentDetailView({ appointment }) {
  const [status, setStatus] = useState(appointment.status)

  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Appointment"
        title={`${appointment.patient} — ${appointment.reason}`}
        description={`${appointment.date} at ${appointment.time} with ${appointment.clinician}`}
      />
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Status" value={status} />
        <Card title="Clinician" value={appointment.clinician} />
        <Card title="Visit type" value="Follow-up" />
      </div>
      <div className="space-y-4">
        <SectionTitle eyebrow="Actions" title="Update appointment" description="Adjust appointment state as you coordinate care." />
        <AppointmentActions
          appointment={{ ...appointment, status }}
          onStatusChange={setStatus}
        />
      </div>
    </div>
  )
}
