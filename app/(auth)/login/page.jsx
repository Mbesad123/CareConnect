'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { loginSchema } from '@/lib/validations'
import { signIn } from '@/lib/auth'

export default function LoginPage() {
  const { pushToast } = useToast()
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = loginSchema.safeParse(formState)
    if (!result.success) {
      const formErrors = result.error.flatten().fieldErrors
      setErrors({
        email: formErrors.email?.[0],
        password: formErrors.password?.[0],
      })
      return
    }

    setErrors({})
    setLoading(true)
    try {
      const session = await signIn(formState)
      document.cookie = `careconnect-token=${session.token}; path=/; max-age=86400`
      pushToast({
        title: 'Welcome back',
        description: `You are now signed in as ${session.user.name}.`,
        type: 'success',
      })
      setTimeout(() => {
        window.location.href = '/'
      }, 400)
    } catch (error) {
      pushToast({
        title: 'Unable to sign in',
        description: error.message,
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl shadow-slate-900/30 backdrop-blur">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
            CareConnect
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Sign in to your workspace</h1>
          <p className="mt-2 text-sm text-slate-500">
            Access patient records, appointments, and analytics in one dashboard.
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            value={formState.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-slate-500">
          New to CareConnect?{' '}
          <Link className="font-semibold text-primary-600 hover:text-primary-500" href="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}
