const initialParticipants = [
  { id: 1, number: 1, name: 'Алексей' },
  { id: 2, number: 2, name: 'Мария' },
  { id: 3, number: 3, name: 'Дмитрий' },
  { id: 4, number: 4, name: 'Екатерина' },
  { id: 5, number: 77, name: 'Иван' },
  { id: 6, number: 100, name: 'Никита' },
  { id: 7, number: 41, name: 'Ольга' },
  { id: 8, number: 45, name: 'Сергей' },
  { id: 9, number: 99, name: 'Анна' },
  { id: 10, number: 71, name: 'Глеб' },
  { id: 11, number: 60, name: 'Матвей' },
  { id: 12, number: 44, name: 'Полина' },
  { id: 13, number: 5, name: 'Артем' },
  { id: 14, number: 89, name: 'Ксения' },
  { id: 15, number: 7, name: 'Максим' },
  { id: 17, number: 6, name: 'Хуяша' },
  { id: 18, number: 8, name: 'Даша' },
  { id: 19, number: 9, name: 'Миша не* пидор' },
  { id: 20, number: 10, name: 'не* Пидор Миша' },
  { id: 21, number: 11, name: 'Миша не* очко 15 см в диаметре' },
  { id: 22, number: 12, name: 'хуй' },
  { id: 23, number: 13, name: 'залупа' },
  { id: 24, number: 14, name: 'Блядь' },
  { id: 25, number: 15, name: 'Шмара' },
  { id: 26, number: 16, name: 'соси' },
  { id: 27, number: 17, name: 'Сосисон' },
]

export const mockDb = {
  // Ссылка на ТГ-бота
  botUrl: 'https://t.me/spk_raffle_bot?start=raffle_2026',
  participants: [...initialParticipants],

  reset() {
    this.participants = [...initialParticipants]
  }
}