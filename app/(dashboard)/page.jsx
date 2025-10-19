import { getClinicMetrics } from './lib/dashboardUtils'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import SectionTitle from '@/components/layout/SectionTitle'
import PageContainer from '@/components/layout/PageContainer'

const { metrics, upcomingAppointments } = getClinicMetrics()

export default function DashboardPage() {
  return (
    <PageContainer className="space-y-12">
      <SectionTitle
        eyebrow="Today"
        title="Morning briefing"
        description="Review key operational metrics and upcoming appointments before the day begins."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} title={metric.label} value={metric.value} trend={metric.trend} trendLabel={metric.trendLabel} />
        ))}
      </div>
      <div className="space-y-6">
        <SectionTitle eyebrow="Schedule" title="Upcoming appointments" description="A quick glance at your next patient visits." />
        <Table
          columns={['Patient', 'Reason', 'Time', 'Clinician']}
          data={upcomingAppointments.map(({ patient, reason, time, clinician }) => [patient, reason, time, clinician])}
        />
      </div>
    </PageContainer>
  )
}
