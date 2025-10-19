import { NextResponse } from 'next/server'
import { createPatient, getPatients } from '../../(dashboard)/patients/lib/patientUtils'

export async function GET() {
  const patients = getPatients()
  return NextResponse.json(patients)
}

export async function POST(request) {
  const payload = await request.json()
  try {
    const patient = createPatient(payload)
    return NextResponse.json(patient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
