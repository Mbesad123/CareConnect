/**
 * Mock database connector used for demo purposes.
 * In production, replace this file with Prisma, Supabase, or MongoDB clients.
 */

let connection = null

export async function connect() {
  if (connection) return connection

  connection = {
    patients: [],
    appointments: [],
    reports: [],
  }

  return connection
}

export async function disconnect() {
  connection = null
}
