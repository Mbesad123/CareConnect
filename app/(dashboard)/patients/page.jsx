'use client'

import { useState } from 'react'
import { listPatients } from './lib/patientUtils'
import PatientTable from './components/PatientTable'
import PatientForm from './components/PatientForm'
import ImportExport from './components/ImportExport'
import SectionTitle from '@/components/layout/SectionTitle'
import PageContainer from '@/components/layout/PageContainer'
import Toast from '@/components/ui/Toast'

export default function PatientsPage() {
  const [patients, setPatients] = useState(() => listPatients())
  const [message, setMessage] = useState(null)

  const handleCreate = (patient) => {
    setPatients((previous) => [...previous, patient])
    setMessage({ type: 'success', text: `${patient.name} added to your registry.` })
  }

  return (
    <PageContainer className="space-y-12">
      <SectionTitle
        eyebrow="Care team"
        title="Patient registry"
        description="Maintain an accurate record of every patient, from intake to ongoing care."
      />
      <ImportExport onExport={() => setMessage({ type: 'info', text: 'Patient list exported successfully.' })} />
      <PatientTable patients={patients} />
      <div className="space-y-6">
        <SectionTitle eyebrow="Add patient" title="Register a new patient" description="Capture essential demographics and notes." />
        <PatientForm onCreate={handleCreate} />
      </div>
      {message && <Toast type={message.type}>{message.text}</Toast>}
    </PageContainer>
  )
}
