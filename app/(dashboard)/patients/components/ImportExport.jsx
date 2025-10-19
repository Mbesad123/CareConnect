'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { exportPatientsAsCsv, importPatientsFromCsv } from '../lib/patientUtils'

export default function ImportExport() {
  const { pushToast } = useToast()
  const [csv, setCsv] = useState('')

  const handleImport = () => {
    try {
      const total = importPatientsFromCsv(csv)
      pushToast({
        title: 'Import complete',
        description: `Added ${total} patients from CSV.`,
        type: 'success',
      })
      setCsv('')
    } catch (error) {
      pushToast({
        title: 'Import failed',
        description: error.message,
        type: 'error',
      })
    }
  }

  const handleExport = () => {
    const output = exportPatientsAsCsv()
    navigator.clipboard.writeText(output)
    pushToast({
      title: 'Export copied',
      description: 'Patient data copied to your clipboard as CSV.',
      type: 'info',
    })
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card">
      <h3 className="text-lg font-semibold text-slate-900">Import & Export</h3>
      <p className="mt-2 text-sm text-slate-500">
        Bring patient records into CareConnect or export a snapshot of your directory for deeper analysis.
      </p>
      <textarea
        value={csv}
        onChange={(event) => setCsv(event.target.value)}
        rows={6}
        placeholder="Paste CSV rows here to import new patients"
        className="mt-4 w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-3 text-sm text-slate-600 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={handleExport}>
          Copy CSV snapshot
        </Button>
        <Button onClick={handleImport} disabled={!csv.trim()}>
          Import patients
        </Button>
      </div>
    </div>
  )
}
