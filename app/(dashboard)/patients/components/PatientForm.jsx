'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Toast from '@/components/ui/Toast'
import { addPatient } from '../lib/patientUtils'

export default function PatientForm({ onCreate }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '', notes: '' })
  const [message, setMessage] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const created = addPatient(form)
    onCreate?.(created)
    setMessage({ type: 'success', text: `Patient ${created.name} added successfully.` })
    setForm({ name: '', email: '', phone: '', dob: '', notes: '' })
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <Input label="Full name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Date of birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          className="resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </label>
      <div className="flex justify-end">
        <Button type="submit">Add patient</Button>
      </div>
      {message && <Toast type={message.type}>{message.text}</Toast>}
    </form>
  )
}
