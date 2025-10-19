import { NextResponse } from 'next/server'
import { listPatients, addPatient } from '@/app/(dashboard)/patients/lib/patientUtils'
import { patientSchema } from '@/lib/validations'

export async function GET() {
  return NextResponse.json({ data: listPatients() })
}

export async function POST(request) {
  const payload = await request.json()
  const parsed = patientSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid patient payload.' }, { status: 400 })
  }

  const patient = addPatient(parsed.data)
  return NextResponse.json({ data: patient }, { status: 201 })
}
