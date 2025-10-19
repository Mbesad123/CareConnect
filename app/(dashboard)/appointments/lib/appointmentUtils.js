const appointments = [
  {
    id: 'ap-101',
    patient: 'Avery Johnson',
    clinician: 'Dr. Ramirez',
    reason: 'Hypertension follow-up',
    date: '2024-06-18',
    time: '09:30 AM',
    status: 'Confirmed',
  },
  {
    id: 'ap-102',
    patient: 'Jordan Miles',
    clinician: 'Dr. Patel',
    reason: 'Cardiology panel review',
    date: '2024-06-18',
    time: '01:00 PM',
    status: 'Confirmed',
  },
  {
    id: 'ap-103',
    patient: 'Priya Desai',
    clinician: 'Dr. Lee',
    reason: 'Diabetes education',
    date: '2024-06-19',
    time: '10:15 AM',
    status: 'Pending',
  },
]

export function listAppointments() {
  return appointments
}

export function getAppointmentById(id) {
  return appointments.find((appointment) => appointment.id === id)
}

export function updateAppointmentStatus(id, status) {
  const appointment = getAppointmentById(id)
  if (!appointment) return null
  appointment.status = status
  return appointment
}
