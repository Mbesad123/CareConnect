'use client'

import Button from '@/components/ui/Button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { formatDate } from '@/lib/utils'

export default function PatientTable({ patients, onSelect, onEdit }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Last visit</TableHead>
          <TableHead>Primary physician</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id} className="hover:bg-primary-50/40">
            <TableCell>
              <div className="font-semibold text-slate-900">{patient.fullName}</div>
              <p className="text-xs text-slate-500">{patient.gender}</p>
            </TableCell>
            <TableCell className="text-slate-600">{patient.email}</TableCell>
            <TableCell className="text-slate-600">{patient.phone}</TableCell>
            <TableCell className="text-slate-600">{formatDate(patient.lastVisit)}</TableCell>
            <TableCell className="text-slate-600">{patient.primaryPhysician}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => onSelect?.(patient)}>
                  View
                </Button>
                <Button variant="secondary" size="sm" onClick={() => onEdit?.(patient)}>
                  Edit
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
