export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
