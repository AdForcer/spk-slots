import { defineStore } from 'pinia'

export const useRaffleStore = defineStore('raffle', () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  // Стейтэкранов
  const stage = ref('qr')
  const botUrl = ref('')
  const isConfigLoading = ref(true)
  const participants = ref([])
  const winner = ref(null)
  const isSettingsOpen = ref(false)

  //Настройка длительности вращения колеса (в секундах)
  const spinDuration = ref(6.5)

  //Получение ссылки для QR-кода с бэка
  async function fetchConfig() {
    isConfigLoading.value = true
    try {
      const data = await $fetch(`${apiBase}/config`)
      const incomingUrl = data?.botUrl || data?.url || data?.link
      if (incomingUrl) {
        botUrl.value = incomingUrl
      }
    } catch (e) {
      console.error('Ошибка загрузки ссылки с бэка:', e)
    } finally {
      isConfigLoading.value = false
    }
  }

  async function updateBotUrl(newUrl) {
    botUrl.value = newUrl
    try {
      await $fetch(`${apiBase}/config`, {
        method: 'POST',
        body: { botUrl: newUrl }
      })
    } catch (e) {
      console.warn('Локальная ссылка обновлена:', e)
    }
  }

  // Получение списка участников с бэкф
  async function fetchParticipants() {
    if (stage.value === 'spinning') return
    try {
      const data = await $fetch(`${apiBase}/participants`)
      if (Array.isArray(data?.participants)) {
        participants.value = data.participants
      } else if (Array.isArray(data)) {
        participants.value = data
      }
    } catch (e) {
      console.error('Ошибка получения участников:', e)
    }
  }

  //Запрос победителя с бэка и старт колеса
  async function startSpin() {
    if (stage.value !== 'wheel' || participants.value.length === 0) return
    try {
      const data = await $fetch(`${apiBase}/winner`, { method: 'POST' })
      const winData = data?.winner || data
      if (winData && winData.number !== undefined) {
        winner.value = winData
        stage.value = 'spinning'
      }
    } catch (e) {
      console.error('Ошибка получения победителя:', e)
    }
  }

  //Переход к экрану поздравления после остановки колеса
  function finishSpin() {
    stage.value = 'winner'
  }

  //Закрытие сессии на бэке и возврат на экран с QR
  async function closeSession() {
    try {
      await $fetch(`${apiBase}/session-close`, { method: 'POST' })
    } catch (e) {
      console.error('Ошибка закрытия сессии:', e)
    } finally {
      winner.value = null
      stage.value = 'qr'
      await fetchConfig()
      await fetchParticipants()
    }
  }

  // Переключение шагов по пробелу / кликеру / кнопке
  async function nextStep() {
    if (isSettingsOpen.value) return

    if (stage.value === 'qr') {
      await fetchParticipants()
      stage.value = 'wheel'
    } else if (stage.value === 'wheel') {
      await startSpin()
    } else if (stage.value === 'winner') {
      await closeSession()
    }
  }

  return {
    stage,
    botUrl,
    isConfigLoading,
    participants,
    winner,
    isSettingsOpen,
    spinDuration,
    fetchConfig,
    updateBotUrl,
    fetchParticipants,
    startSpin,
    finishSpin,
    closeSession,
    nextStep
  }
})