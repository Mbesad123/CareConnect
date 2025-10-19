import { db } from '@/lib/db'
import { formatDate, formatTime } from '@/lib/utils'

export function getKpis() {
  return [
    {
      id: 'patients',
      label: 'Active patients',
      value: db.patients.length,
      change: '+12.5% vs last month',
      trend: 'up',
    },
    {
      id: 'appointments',
      label: 'Appointments today',
      value: db.appointments.filter((appointment) => appointment.status === 'Confirmed').length,
      change: '92% capacity filled',
      trend: 'stable',
    },
    {
      id: 'satisfaction',
      label: 'Patient satisfaction',
      value: '4.8/5',
      change: 'Based on 124 survey responses',
      trend: 'up',
    },
  ]
}

export function getUpcomingAppointments(limit = 5) {
  return db.appointments.slice(0, limit).map((appointment) => ({
    ...appointment,
    dateLabel: formatDate(appointment.date, { weekday: 'short', month: 'short', day: 'numeric' }),
    timeLabel: formatTime(appointment.time),
    patient: db.patients.find((patient) => patient.id === appointment.patientId),
  }))
}

export function getCareTeamHighlights() {
  return [
    {
      id: 'highlight-1',
      title: 'Streamlined intake',
      detail: 'Average intake time reduced to 9 minutes with new questionnaire.',
    },
    {
      id: 'highlight-2',
      title: 'Telehealth coverage',
      detail: '7 of 9 providers now offering virtual visits at least twice weekly.',
    },
    {
      id: 'highlight-3',
      title: 'Care gaps closed',
      detail: 'Twelve high-risk patients completed their overdue follow-ups this week.',
    },
  ]
}
