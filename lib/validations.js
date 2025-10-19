import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
})

export const patientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  dob: z.string().optional(),
  notes: z.string().optional(),
})
