export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

export function generateId() {
  return crypto.randomUUID()
}
