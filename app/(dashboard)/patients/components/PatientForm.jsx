'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const genders = ['Female', 'Male', 'Non-binary', 'Prefer not to say']

export default function PatientForm({ patient, onSubmit, onCancel }) {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    primaryPhysician: '',
    notes: '',
  })

  useEffect(() => {
    if (patient) {
      setFormState({
        fullName: patient.fullName ?? '',
        email: patient.email ?? '',
        phone: patient.phone ?? '',
        dateOfBirth: patient.dateOfBirth ?? '',
        gender: patient.gender ?? '',
        primaryPhysician: patient.primaryPhysician ?? '',
        notes: patient.notes ?? '',
      })
    }
  }, [patient])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.(formState)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" name="fullName" value={formState.fullName} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={formState.email} onChange={handleChange} required />
        <Input label="Phone" name="phone" value={formState.phone} onChange={handleChange} required />
        <Input label="Date of birth" name="dateOfBirth" type="date" value={formState.dateOfBirth} onChange={handleChange} required />
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Gender
          <select
            name="gender"
            value={formState.gender}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            {genders.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <Input
          label="Primary physician"
          name="primaryPhysician"
          value={formState.primaryPhysician}
          onChange={handleChange}
          required
        />
      </div>
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Notes
        <textarea
          name="notes"
          value={formState.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Key clinical details, upcoming care needs, or preferences"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </label>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save patient</Button>
      </div>
    </form>
  )
}
