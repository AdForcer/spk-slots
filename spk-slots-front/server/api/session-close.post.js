import { mockDb } from '../utils/mockDb'

export default defineEventHandler(() => {
  mockDb.reset()
  return { status: 'ok' }
})