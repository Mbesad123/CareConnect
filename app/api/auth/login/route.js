import { NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validations'
import { verifyUser } from '@/lib/auth'

export async function POST(request) {
  const payload = await request.json()
  const parsed = loginSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid credentials.' }, { status: 400 })
  }

  const result = await verifyUser(parsed.data)
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 401 })
  }

  return NextResponse.json({ token: result.token })
}
