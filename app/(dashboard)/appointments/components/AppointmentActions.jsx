'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'
import { updateAppointmentStatus } from '../lib/appointmentUtils'

export default function AppointmentActions({ appointment, onStatusChange }) {
  const [status, setStatus] = useState(appointment.status)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    setStatus(appointment.status)
  }, [appointment.status])

  const handleStatusChange = (nextStatus) => {
    updateAppointmentStatus(appointment.id, nextStatus)
    setStatus(nextStatus)
    onStatusChange?.(nextStatus)
    setMessage({ type: 'success', text: `Status updated to ${nextStatus}.` })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => handleStatusChange('Confirmed')} disabled={status === 'Confirmed'}>
          Mark as confirmed
        </Button>
        <Button variant="secondary" onClick={() => handleStatusChange('Completed')} disabled={status === 'Completed'}>
          Mark as completed
        </Button>
        <Button variant="ghost" onClick={() => handleStatusChange('Cancelled')} disabled={status === 'Cancelled'}>
          Cancel appointment
        </Button>
      </div>
      {message && <Toast type={message.type}>{message.text}</Toast>}
    </div>
  )
}
