import { db } from '../../../../lib/db'
import { reportFiltersSchema } from '../../../../lib/validations'

export function getReports(filters = {}) {
  const result = reportFiltersSchema.partial().safeParse(filters)
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Invalid filters')
  }
  return db.reports
}
