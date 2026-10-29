import { mockDb } from '../utils/mockDb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (body?.botUrl) {
    mockDb.botUrl = body.botUrl
  }
  return {
    botUrl: mockDb.botUrl
  }
})