'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { useToast } from '../../../components/ui/Toast'
import { signupSchema } from '../../../lib/validations'
import { signUp } from '../../../lib/auth'

export default function SignupPage() {
  const { pushToast } = useToast()
  const [formState, setFormState] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = signupSchema.safeParse(formState)
    if (!result.success) {
      const formErrors = result.error.flatten().fieldErrors
      setErrors({
        name: formErrors.name?.[0],
        email: formErrors.email?.[0],
        password: formErrors.password?.[0],
      })
      return
    }

    setErrors({})
    setLoading(true)
    try {
      const session = await signUp(formState)
      document.cookie = `careconnect-token=${session.token}; path=/; max-age=86400`
      pushToast({
        title: 'Account created',
        description: `Welcome aboard, ${session.user.name}! Redirecting you to the dashboard.`,
        type: 'success',
      })
      setTimeout(() => {
        window.location.href = '/'
      }, 400)
    } catch (error) {
      pushToast({
        title: 'Something went wrong',
        description: error.message,
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-900 via-slate-900 to-slate-950 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white/95 p-8 shadow-2xl shadow-slate-900/30 backdrop-blur">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
            CareConnect
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create your clinical hub</h1>
          <p className="mt-2 text-sm text-slate-500">
            Collaborate with your care team and centralize your day-to-day operations.
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Full name"
            name="name"
            autoComplete="name"
            value={formState.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={formState.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formState.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link className="font-semibold text-primary-600 hover:text-primary-500" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
