const patients = [
  {
    id: 'pat-001',
    fullName: 'Amelia Carter',
    email: 'amelia.carter@example.com',
    phone: '+1 (212) 555-0144',
    dateOfBirth: '1987-11-05',
    gender: 'Female',
    primaryPhysician: 'Dr. Ethan Walsh',
    lastVisit: '2024-02-12',
    notes: 'Managing Type 2 Diabetes with lifestyle adjustments.',
  },
  {
    id: 'pat-002',
    fullName: 'Noah Patel',
    email: 'noah.patel@example.com',
    phone: '+1 (415) 555-0911',
    dateOfBirth: '1994-04-18',
    gender: 'Male',
    primaryPhysician: 'Dr. Sarah Linden',
    lastVisit: '2024-01-21',
    notes: 'Recovery from ACL repair. Weekly physiotherapy sessions.',
  },
]

const appointments = [
  {
    id: 'apt-101',
    patientId: 'pat-001',
    provider: 'Dr. Ethan Walsh',
    date: '2024-03-05',
    time: '09:30',
    location: 'CareConnect Clinic – Room 2A',
    type: 'Follow-up',
    status: 'Confirmed',
    notes: 'Discuss blood panel results and adjust treatment plan.',
  },
  {
    id: 'apt-102',
    patientId: 'pat-002',
    provider: 'Dr. Sarah Linden',
    date: '2024-03-07',
    time: '13:15',
    location: 'CareConnect Clinic – Room 5C',
    type: 'Physiotherapy',
    status: 'Pending',
    notes: 'Assess mobility and update exercise regimen.',
  },
]

const reports = [
  {
    id: 'rep-901',
    title: 'Monthly Patient Intake',
    createdAt: '2024-02-29',
    author: 'Operations',
    summary: '17% increase in new patient registrations month-over-month.',
  },
  {
    id: 'rep-902',
    title: 'Telehealth Utilization',
    createdAt: '2024-02-15',
    author: 'Analytics',
    summary: 'Telehealth accounted for 38% of all consultations this quarter.',
  },
]

export const db = {
  patients,
  appointments,
  reports,
}
