import { NextResponse } from 'next/server'
import { signUp } from '@/lib/auth'

export async function POST(request) {
  const payload = await request.json()
  try {
    const session = await signUp(payload)
    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
