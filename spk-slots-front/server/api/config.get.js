import { mockDb } from '../utils/mockDb'

export default defineEventHandler(() => {
  return {
    botUrl: mockDb.botUrl
  }
})