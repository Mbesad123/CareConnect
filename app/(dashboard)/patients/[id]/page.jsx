import { notFound } from 'next/navigation'
import SectionTitle from '@/components/layout/SectionTitle'
import PageContainer from '@/components/layout/PageContainer'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import { getPatientById } from '../lib/patientUtils'

export default function PatientDetailPage({ params }) {
  const patient = getPatientById(params.id)

  if (!patient) {
    notFound()
  }

  return (
    <PageContainer className="space-y-12">
      <SectionTitle
        eyebrow="Patient overview"
        title={patient.name}
        description={`Born ${new Date(patient.dob).toLocaleDateString()} • ${patient.phone}`}
      />
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Last visit" value={patient.lastVisit} />
        <Card title="Next appointment" value={patient.nextAppointment} />
        <Card title="Contact" value={patient.email} />
      </div>
      <div className="space-y-4">
        <SectionTitle eyebrow="Notes" title="Clinical summary" description="Key context from recent encounters." />
        <p className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-sm leading-relaxed text-slate-100">
          {patient.notes}
        </p>
      </div>
      <div className="space-y-4">
        <SectionTitle eyebrow="History" title="Vitals & labs" description="Snapshot of recent health indicators." />
        <Table
          columns={['Date', 'Type', 'Result', 'Clinician']}
          data={[
            ['2024-05-24', 'Blood pressure', '118/72 mmHg', 'Dr. Ramirez'],
            ['2024-04-11', 'A1C', '6.4%', 'Dr. Patel'],
            ['2024-03-30', 'Lipid panel', 'LDL 82 mg/dL', 'Dr. Ramirez'],
          ]}
        />
      </div>
    </PageContainer>
  )
}
