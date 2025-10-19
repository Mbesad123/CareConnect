import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Tell us who you are with at least 2 characters'),
})

export const patientSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(3, 'Patient name must be at least 3 characters'),
  email: z.string().email('Include a valid email to reach the patient'),
  phone: z.string().min(10, 'Phone numbers must include area code'),
  dateOfBirth: z.string(),
  gender: z.string(),
  primaryPhysician: z.string().min(2, 'Assign a primary physician'),
  notes: z.string().optional(),
})

export const appointmentSchema = z.object({
  id: z.string().optional(),
  patientId: z.string().min(1, 'Select a patient'),
  provider: z.string().min(2, 'Assign a provider'),
  date: z.string(),
  time: z.string(),
  location: z.string().min(3, 'Specify where the visit will take place'),
  type: z.string().min(2, 'Define the appointment type'),
  status: z.enum(['Pending', 'Confirmed', 'Completed', 'Cancelled']),
  notes: z.string().optional(),
})

export const reportFiltersSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  type: z.enum(['Utilization', 'Outcomes', 'Financial', 'Operational']).optional(),
})
