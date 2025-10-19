import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardShell from '../components/DashboardShell'
import Button from '../../../components/ui/Button'
import Modal from '../../../components/ui/Modal'
import { useToast } from '../../../components/ui/Toast'
import ImportExport from './components/ImportExport'
import PatientForm from './components/PatientForm'
import PatientTable from './components/PatientTable'
import { getPatients, createPatient, updatePatient } from './lib/patientUtils'

function PatientsPageContent({ patients: initialPatients }) {
  'use client'

  const [patients, setPatients] = useState(initialPatients)
  const [open, setOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const { pushToast } = useToast()
  const router = useRouter()

  const handleCreate = () => {
    setEditingPatient(null)
    setOpen(true)
  }

  const handleEdit = (patient) => {
    setEditingPatient(patient)
    setOpen(true)
  }

  const handleSubmit = (payload) => {
    try {
      if (editingPatient) {
        const updated = updatePatient(editingPatient.id, payload)
        setPatients((current) => current.map((entry) => (entry.id === updated.id ? updated : entry)))
        pushToast({
          title: 'Patient updated',
          description: `${updated.fullName} has been updated successfully.`,
          type: 'success',
        })
      } else {
        const created = createPatient(payload)
        setPatients((current) => [created, ...current])
        pushToast({
          title: 'Patient added',
          description: `${created.fullName} is now part of your directory.`,
          type: 'success',
        })
      }
      setOpen(false)
    } catch (error) {
      pushToast({
        title: 'Unable to save patient',
        description: error.message,
        type: 'error',
      })
    }
  }

  return (
    <DashboardShell
      title="Patients"
      description="A unified, filterable source of truth for every patient, their care plans, and key contacts."
      actions={<Button onClick={handleCreate}>New patient</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card">
          <PatientTable
            patients={patients}
            onSelect={(patient) => router.push(`/patients/${patient.id}`)}
            onEdit={handleEdit}
          />
        </div>
        <ImportExport />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingPatient ? 'Edit patient' : 'Add patient'}
        description={
          editingPatient
            ? 'Update patient demographics, care team assignments, or engagement notes.'
            : 'Capture a new patient to keep your team aligned from day one.'
        }
      >
        <PatientForm patient={editingPatient} onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </Modal>
    </DashboardShell>
  )
}

export default function PatientsPage() {
  const patients = getPatients()
  return <PatientsPageContent patients={patients} />
}
