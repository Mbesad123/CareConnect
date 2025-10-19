'use client'

import Link from 'next/link'
import Table from '@/components/ui/Table'

export default function PatientTable({ patients }) {
  return (
    <Table
      columns={['Patient', 'DOB', 'Phone', 'Email', 'Last visit', 'Next appointment']}
      data={patients.map((patient) => [
        <Link key={patient.id} href={`/dashboard/patients/${patient.id}`} className="font-medium text-sky-300">
          {patient.name}
        </Link>,
        patient.dob,
        patient.phone,
        patient.email,
        patient.lastVisit,
        patient.nextAppointment,
      ])}
    />
  )
}
