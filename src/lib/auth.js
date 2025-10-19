const users = [
  {
    id: 'user-001',
    email: 'clinician@example.com',
    password: 'password123',
    name: 'Dr. Lena Ortiz',
  },
]

export async function signIn({ email, password }) {
  const user = users.find((entry) => entry.email === email && entry.password === password)
  if (!user) {
    throw new Error('Invalid credentials. Double-check the email and password provided.')
  }
  return {
    token: `mock-token-${user.id}`,
    user: { id: user.id, email: user.email, name: user.name },
  }
}

export async function signUp({ email, password, name }) {
  const exists = users.some((entry) => entry.email === email)
  if (exists) {
    throw new Error('An account already exists with the provided email address.')
  }
  const newUser = {
    id: `user-${String(users.length + 1).padStart(3, '0')}`,
    email,
    password,
    name,
  }
  users.push(newUser)
  return {
    token: `mock-token-${newUser.id}`,
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
  }
}

export async function getSession(token) {
  if (!token) return null
  const id = token.replace('mock-token-', '')
  const user = users.find((entry) => entry.id === id)
  if (!user) return null
  return { user: { id: user.id, email: user.email, name: user.name } }
}

export async function verifyUser(token) {
  const session = await getSession(token)
  return Boolean(session)
}
