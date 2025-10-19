import { db } from '@/lib/db'
import { appointmentSchema } from '@/lib/validations'

export function getAppointments() {
  return db.appointments
}

export function getAppointmentById(id) {
  return db.appointments.find((appointment) => appointment.id === id)
}

export function updateAppointmentStatus(id, status) {
  const appointment = getAppointmentById(id)
  if (!appointment) throw new Error('Appointment not found')
  appointment.status = status
  return appointment
}

export function createAppointment(payload) {
  const result = appointmentSchema.safeParse(payload)
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Unable to create appointment')
  }
  const appointment = {
    ...result.data,
    id: `apt-${String(db.appointments.length + 1).padStart(3, '0')}`,
  }
  db.appointments.push(appointment)
  return appointment
}
