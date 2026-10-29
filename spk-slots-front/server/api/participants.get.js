import { mockDb } from '../utils/mockDb'

export default defineEventHandler(() => {
  return {
    participants: mockDb.participants
  }
})