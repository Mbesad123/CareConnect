import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import Input from '@/components/ui/Input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { formatDate, formatTime } from '@/lib/utils'
import { createAppointment, getAppointments, updateAppointmentStatus } from './lib/appointmentUtils'

function NewAppointmentModal({ open, onClose, onCreated }) {
  'use client'

  const [formState, setFormState] = useState({
    patientId: '',
    provider: '',
    date: '',
    time: '',
    location: '',
    type: '',
    status: 'Pending',
    notes: '',
  })
  const { pushToast } = useToast()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      const appointment = createAppointment(formState)
      onCreated?.(appointment)
      pushToast({
        title: 'Appointment scheduled',
        description: `${appointment.type} for ${appointment.patientId} on ${formatDate(appointment.date)}.`,
        type: 'success',
      })
      onClose?.()
    } catch (error) {
      pushToast({
        title: 'Unable to schedule',
        description: error.message,
        type: 'error',
      })
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Schedule appointment"
      description="Create a new visit, assign a provider, and communicate expectations to your team."
      primaryAction={{ label: 'Save appointment', onClick: handleSubmit }}
      secondaryAction={{ label: 'Cancel', onClick: onClose, variant: 'ghost' }}
    >
      <form id="new-appointment" className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Patient ID" name="patientId" value={formState.patientId} onChange={handleChange} required />
          <Input label="Provider" name="provider" value={formState.provider} onChange={handleChange} required />
          <Input label="Date" name="date" type="date" value={formState.date} onChange={handleChange} required />
          <Input label="Time" name="time" type="time" value={formState.time} onChange={handleChange} required />
          <Input label="Location" name="location" value={formState.location} onChange={handleChange} required />
          <Input label="Type" name="type" value={formState.type} onChange={handleChange} required />
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Status
            <select
              name="status"
              value={formState.status}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Notes
          <textarea
            name="notes"
            value={formState.notes}
            onChange={handleChange}
            rows={3}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>
      </form>
    </Modal>
  )
}

function AppointmentsTable({ appointments: initialAppointments }) {
  'use client'

  const [appointments, setAppointments] = useState(initialAppointments)
  const [open, setOpen] = useState(false)
  const { pushToast } = useToast()

  const handleStatusChange = (id, status) => {
    const updated = updateAppointmentStatus(id, status)
    setAppointments((current) => current.map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment)))
    pushToast({
      title: 'Status updated',
      description: `${updated.type} is now marked as ${status}.`,
      type: 'info',
    })
  }

  const handleCreated = (appointment) => {
    setAppointments((current) => [appointment, ...current])
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Schedule appointment</Button>
      <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patientId}</TableCell>
                <TableCell>{appointment.provider}</TableCell>
                <TableCell>{formatDate(appointment.date)}</TableCell>
                <TableCell>{formatTime(appointment.time)}</TableCell>
                <TableCell>{appointment.location}</TableCell>
                <TableCell>
                  <select
                    value={appointment.status}
                    onChange={(event) => handleStatusChange(appointment.id, event.target.value)}
                    className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
                  >
                    {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <NewAppointmentModal open={open} onClose={() => setOpen(false)} onCreated={handleCreated} />
    </>
  )
}

export default function AppointmentsPage() {
  const appointments = getAppointments()

  return (
    <DashboardShell
      title="Appointments"
      description="Coordinate every encounter and keep patients informed before, during, and after each visit."
      actions={null}
    >
      <AppointmentsTable appointments={appointments} />
    </DashboardShell>
  )
}
