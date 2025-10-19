import { NextResponse } from 'next/server'
import { signupSchema } from '@/lib/validations'
import { verifyUser } from '@/lib/auth'

export async function POST(request) {
  const payload = await request.json()
  const parsed = signupSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid registration details.' }, { status: 400 })
  }

  const result = await verifyUser(parsed.data)
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 401 })
  }

  return NextResponse.json({ token: result.token })
}
