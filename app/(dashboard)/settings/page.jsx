'use client'

import { useState } from 'react'
import SectionTitle from '@/components/layout/SectionTitle'
import PageContainer from '@/components/layout/PageContainer'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'

export default function SettingsPage() {
  const [form, setForm] = useState({ organization: 'CareConnect Clinic', timezone: 'America/Chicago', notifications: true })
  const [message, setMessage] = useState(null)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage({ type: 'success', text: 'Settings updated successfully.' })
  }

  return (
    <PageContainer className="space-y-12">
      <SectionTitle eyebrow="Preferences" title="Practice settings" description="Configure organization defaults and communication preferences." />
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Organization name"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            required
          />
          <Input label="Primary timezone" name="timezone" value={form.timezone} onChange={handleChange} />
        </div>
        <label className="flex items-center gap-3 text-sm font-medium text-slate-200">
          <input
            type="checkbox"
            name="notifications"
            checked={form.notifications}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-700 bg-slate-900"
          />
          Enable notifications for missed follow-ups
        </label>
        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
        {message && <Toast type={message.type}>{message.text}</Toast>}
      </form>
    </PageContainer>
  )
}
