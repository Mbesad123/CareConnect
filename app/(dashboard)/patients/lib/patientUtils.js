import { db } from '@/lib/db'
import { patientSchema } from '@/lib/validations'

export function getPatients() {
  return db.patients
}

export function getPatientById(id) {
  return db.patients.find((patient) => patient.id === id)
}

export function createPatient(payload) {
  const result = patientSchema.safeParse(payload)
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Unable to save patient')
  }
  const newPatient = {
    ...result.data,
    id: `pat-${String(db.patients.length + 1).padStart(3, '0')}`,
    lastVisit: new Date().toISOString().slice(0, 10),
  }
  db.patients.push(newPatient)
  return newPatient
}

export function updatePatient(id, payload) {
  const patientIndex = db.patients.findIndex((patient) => patient.id === id)
  if (patientIndex === -1) {
    throw new Error('Patient not found')
  }
  const result = patientSchema.safeParse({ ...db.patients[patientIndex], ...payload, id })
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Unable to update patient')
  }
  db.patients[patientIndex] = result.data
  return db.patients[patientIndex]
}

export function exportPatientsAsCsv() {
  const headers = ['ID', 'Full name', 'Email', 'Phone', 'Date of birth', 'Gender', 'Primary physician', 'Last visit']
  const rows = db.patients.map((patient) =>
    [
      patient.id,
      patient.fullName,
      patient.email,
      patient.phone,
      patient.dateOfBirth,
      patient.gender,
      patient.primaryPhysician,
      patient.lastVisit,
    ].join(',')
  )
  return [headers.join(','), ...rows].join('\n')
}

export function importPatientsFromCsv(csvString) {
  const [, ...rows] = csvString.split('\n').map((row) => row.trim())
  const imported = rows
    .map((row) => row.split(','))
    .filter((columns) => columns[0] && columns[1])
    .map((columns) => ({
      id: columns[0],
      fullName: columns[1],
      email: columns[2],
      phone: columns[3],
      dateOfBirth: columns[4],
      gender: columns[5],
      primaryPhysician: columns[6],
      lastVisit: columns[7],
    }))
  db.patients.push(...imported)
  return imported.length
}
