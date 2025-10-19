import { NextResponse } from 'next/server'
import { signIn } from '../../../../lib/auth'

export async function POST(request) {
  const credentials = await request.json()
  try {
    const session = await signIn(credentials)
    return NextResponse.json(session)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }
}
