'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Toast from '@/components/ui/Toast'
import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState(null)
  const [pending, setPending] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setPending(true)
    setMessage(null)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message ?? 'Unable to create account')
      }

      setMessage({ type: 'success', text: 'Account created! Redirecting to dashboard…' })
      setTimeout(() => router.push('/dashboard'), 750)
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setPending(false)
    }
  }

  return (
    <PageContainer>
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center gap-8 py-16">
        <SectionTitle
          eyebrow="Get started"
          title="Create your CareConnect account"
          description="Bring your team together with collaborative tools for every step of the patient journey."
        />
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            label="Full name"
            placeholder="Dr. Taylor Ramirez"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="care.team@clinic.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <Button type="submit" disabled={pending} loading={pending}>
            Sign up
          </Button>
        </form>
        <p className="text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium">
            Sign in
          </Link>
        </p>
        {message && <Toast type={message.type}>{message.text}</Toast>}
      </div>
    </PageContainer>
  )
}
