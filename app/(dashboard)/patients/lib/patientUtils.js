const patients = [
  {
    id: 'pt-001',
    name: 'Avery Johnson',
    dob: '1988-03-12',
    phone: '(312) 555-0198',
    email: 'avery.johnson@example.com',
    lastVisit: '2024-06-01',
    nextAppointment: '2024-06-28 10:30 AM',
    notes: 'Monitoring hypertension. Adjusted medication last visit.',
  },
  {
    id: 'pt-002',
    name: 'Jordan Miles',
    dob: '1975-11-05',
    phone: '(773) 555-0114',
    email: 'jordan.miles@example.com',
    lastVisit: '2024-05-24',
    nextAppointment: '2024-06-26 02:00 PM',
    notes: 'Preparing for annual cardiology panel.',
  },
  {
    id: 'pt-003',
    name: 'Priya Desai',
    dob: '1992-07-19',
    phone: '(872) 555-0146',
    email: 'priya.desai@example.com',
    lastVisit: '2024-05-15',
    nextAppointment: '2024-06-20 09:15 AM',
    notes: 'Diabetes education follow-up. Reviewing nutrition plan.',
  },
]

export function listPatients() {
  return patients
}

export function getPatientById(id) {
  return patients.find((patient) => patient.id === id)
}

export function addPatient(patient) {
  patients.push({
    id: `pt-${String(patients.length + 1).padStart(3, '0')}`,
    ...patient,
  })

  return patients[patients.length - 1]
}

export function exportPatientsToCsv() {
  const header = 'id,name,dob,phone,email,lastVisit,nextAppointment,notes'
  const rows = patients.map((patient) =>
    [
      patient.id,
      patient.name,
      patient.dob,
      patient.phone,
      patient.email,
      patient.lastVisit,
      patient.nextAppointment,
      JSON.stringify(patient.notes ?? ''),
    ].join(',')
  )

  return [header, ...rows].join('\n')
}
