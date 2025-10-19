import { useMemo, useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { formatDate } from '@/lib/utils'
import { getReports } from './lib/reportUtils'

function ReportsFilters({ onChange }) {
  'use client'

  const [filters, setFilters] = useState({ from: '', to: '', type: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...filters, [name]: value }
    setFilters(next)
    onChange?.(next)
  }

  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card sm:grid-cols-3">
      <Input label="From" name="from" type="date" value={filters.from} onChange={handleChange} />
      <Input label="To" name="to" type="date" value={filters.to} onChange={handleChange} />
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Report type
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <option value="">All</option>
          {['Utilization', 'Outcomes', 'Financial', 'Operational'].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  )
}

function ReportsTable({ reports: initialReports }) {
  'use client'

  const [filters, setFilters] = useState({})
  const reports = useMemo(() => getReports(filters), [filters])

  return (
    <>
      <ReportsFilters onChange={setFilters} />
      <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div className="font-semibold text-slate-900">{report.title}</div>
                  <p className="text-xs text-slate-500">{report.summary}</p>
                </TableCell>
                <TableCell>{formatDate(report.createdAt)}</TableCell>
                <TableCell>{report.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default function ReportsPage() {
  const reports = getReports()

  return (
    <DashboardShell
      title="Reports"
      description="Surface insights about clinical operations, financial health, and patient outcomes."
      actions={<Button variant="secondary">Generate report</Button>}
    >
      <ReportsTable reports={reports} />
    </DashboardShell>
  )
}
