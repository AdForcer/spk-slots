
import { mockDb } from '../utils/mockDb'

export default defineEventHandler(() => {
  const list = mockDb.participants
  if (!list.length) {
    throw createError({ statusCode: 400, statusMessage: 'Нет участников для розыгрыша' })
  }
  const randomIndex = Math.floor(Math.random() * list.length)
  return {
    winner: list[randomIndex]
  }
})