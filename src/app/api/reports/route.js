import { NextResponse } from 'next/server'
import { getReports } from '../../(dashboard)/reports/lib/reportUtils'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const filters = Object.fromEntries(searchParams)
  try {
    const reports = getReports(filters)
    return NextResponse.json(reports)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
