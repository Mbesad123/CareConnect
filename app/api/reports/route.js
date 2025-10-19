import { NextResponse } from 'next/server'
import { listReports } from '@/app/(dashboard)/reports/lib/reportUtils'

export async function GET() {
  return NextResponse.json({ data: listReports() })
}
