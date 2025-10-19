import { NextResponse } from 'next/server'
import { createAppointment, getAppointments } from '../../(dashboard)/appointments/lib/appointmentUtils'

export async function GET() {
  return NextResponse.json(getAppointments())
}

export async function POST(request) {
  const payload = await request.json()
  try {
    const appointment = createAppointment(payload)
    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
