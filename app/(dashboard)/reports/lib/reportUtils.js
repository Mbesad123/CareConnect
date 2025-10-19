export const reportFilters = ['Monthly summary', 'Quality metrics', 'Population health']

export function listReports() {
  return [
    {
      id: 'rp-901',
      title: 'May 2024 Quality Metrics',
      createdAt: '2024-06-01',
      author: 'Quality Team',
      summary:
        'Highlights clinical quality indicators across hypertension, diabetes, and preventive screenings. Includes opportunities for improvement and compliance checks.',
    },
    {
      id: 'rp-902',
      title: 'Patient Satisfaction Survey Results',
      createdAt: '2024-05-22',
      author: 'Experience Team',
      summary: 'Aggregated patient feedback from Q2 with NPS of 68. Details on communication and wait time improvements.',
    },
    {
      id: 'rp-903',
      title: 'Value-based Care Cohort Analysis',
      createdAt: '2024-05-10',
      author: 'Population Health',
      summary: 'Stratifies high-risk cohorts and tracks care gap closure progress for accountable care contracts.',
    },
  ]
}
