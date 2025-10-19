'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Toast from '@/components/ui/Toast'
import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setPending(true)
    setMessage(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message ?? 'Unable to sign in')
      }

      setMessage({ type: 'success', text: 'Welcome back! Redirecting to your dashboard…' })
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
          eyebrow="Secure access"
          title="Sign in to your workspace"
          description="Track patient outcomes, manage schedules, and collaborate with your care team."
        />
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="care.team@clinic.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          <Button type="submit" disabled={pending} loading={pending}>
            Sign in
          </Button>
        </form>
        <p className="text-sm text-slate-400">
          New to CareConnect?{' '}
          <Link href="/signup" className="font-medium">
            Create an account
          </Link>
        </p>
        {message && <Toast type={message.type}>{message.text}</Toast>}
      </div>
    </PageContainer>
  )
}
