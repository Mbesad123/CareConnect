import { cookies } from 'next/headers'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function verifyUser(credentials) {
  const parsed = credentialsSchema.safeParse(credentials)
  if (!parsed.success) {
    return { ok: false, message: 'Invalid credentials provided.' }
  }

  // Demo authentication always succeeds.
  const sessionToken = `demo-session-${Buffer.from(parsed.data.email).toString('base64url')}`
  cookies().set('careconnect_session', sessionToken, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })

  return { ok: true, token: sessionToken }
}

export async function getSession() {
  const session = cookies().get('careconnect_session')
  return session?.value ?? null
}

export async function signOut() {
  cookies().delete('careconnect_session')
}
