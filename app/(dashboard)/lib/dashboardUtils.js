export function getClinicMetrics() {
  return {
    metrics: [
      {
        label: 'Active patients',
        value: '1,284',
        trend: '+3.2%',
        trendLabel: 'vs. last month',
      },
      {
        label: 'Appointments today',
        value: '48',
        trend: '+6',
        trendLabel: 'since yesterday',
      },
      {
        label: 'Follow-ups due',
        value: '12',
        trend: '-2',
        trendLabel: 'week over week',
      },
      {
        label: 'Patient satisfaction',
        value: '92%',
        trend: '+4%',
        trendLabel: 'quarter to date',
      },
    ],
    upcomingAppointments: [
      { patient: 'Avery Johnson', reason: 'Blood pressure check', time: '9:30 AM', clinician: 'Dr. Ramirez' },
      { patient: 'Jordan Miles', reason: 'Cardiology follow-up', time: '11:00 AM', clinician: 'Dr. Patel' },
      { patient: 'Priya Desai', reason: 'Diabetes education', time: '1:15 PM', clinician: 'Dr. Lee' },
      { patient: 'Henry Chen', reason: 'Annual physical', time: '3:45 PM', clinician: 'NP Davis' },
    ],
  }
}
