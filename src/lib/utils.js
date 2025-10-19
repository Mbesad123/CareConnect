export function formatDate(dateString, options = {}) {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

export function formatTime(timeString) {
  if (!timeString) return '—'
  const [hour, minutes] = timeString.split(':')
  const date = new Date()
  date.setHours(Number(hour))
  date.setMinutes(Number(minutes))
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function capitalize(value = '') {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export function groupBy(array, iteratee) {
  return array.reduce((accumulator, item) => {
    const key = iteratee(item)
    if (!accumulator[key]) accumulator[key] = []
    accumulator[key].push(item)
    return accumulator
  }, {})
}
