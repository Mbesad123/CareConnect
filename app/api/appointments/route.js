import { NextResponse } from 'next/server'
import { listAppointments } from '@/app/(dashboard)/appointments/lib/appointmentUtils'

export async function GET() {
  return NextResponse.json({ data: listAppointments() })
}
