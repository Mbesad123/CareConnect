'use client'

import Button from '@/components/ui/Button'
import { exportPatientsToCsv } from '../lib/patientUtils'

export default function ImportExport({ onExport }) {
  const handleExport = () => {
    const csv = exportPatientsToCsv()
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'careconnect-patients.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    onExport?.()
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" disabled>
        Import CSV (coming soon)
      </Button>
      <Button onClick={handleExport}>Export CSV</Button>
    </div>
  )
}
