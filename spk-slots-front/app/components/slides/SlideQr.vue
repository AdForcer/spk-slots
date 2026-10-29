<template>
  <div class="relative z-10 flex flex-col items-center justify-center w-full h-full text-white px-4 py-6">
    <h1 class="text-[clamp(1.5rem,4vmin,3.5rem)] font-bold mb-[3vmin] tracking-wide text-center drop-shadow">
      Регистрация в розыгрыше
    </h1>

    <div class="bg-white p-[2.5vmin] rounded-3xl shadow-2xl mb-[3vmin] w-[min(65vw,44vh)] aspect-square flex items-center justify-center">
      <div v-if="store.isConfigLoading" class="text-slate-500 font-semibold text-center px-4">
        Загрузка QR-кода с сервера...
      </div>
      <QrcodeVue
        v-else-if="store.botUrl"
        :value="store.botUrl"
        :size="500"
        level="M"
        render-as="svg"
        class="w-full h-full"
      />
      <div v-else class="text-red-500 font-semibold text-center px-4">
        Ссылка не получена с бэкенда (нажмите S)
      </div>
    </div>

    <p class="text-[clamp(0.95rem,2.2vmin,1.6rem)] font-medium mb-[3vmin] text-white/90 text-center max-w-2xl">
      Отсканируйте QR-код и зарегистрируйтесь в Telegram-боте
    </p>

    <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
      <div class="bg-white/15 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl text-[clamp(0.95rem,2vmin,1.35rem)] font-semibold">
        Участников: <span class="text-[#F7C114] font-bold">{{ store.participants.length }}</span>
      </div>

      <button
        @click="store.nextStep()"
        class="bg-[#F7C114] hover:bg-[#ffcf33] text-slate-900 font-bold text-[clamp(0.95rem,2vmin,1.35rem)] px-6 py-2.5 sm:px-8 sm:py-3 rounded-2xl shadow-lg transition active:scale-95"
      >
        К колесу
      </button>
    </div>

    <button
      @click="store.isSettingsOpen = true"
      class="fixed bottom-4 right-4 bg-black/25 hover:bg-black/40 text-white/80 px-3.5 py-2 rounded-xl text-xs sm:text-sm transition"
    >
      Настройки (s)
    </button>
  </div>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue'
import { useIntervalFn } from '@vueuse/core'
import { useRaffleStore } from '~/stores/raffle'

const store = useRaffleStore()

// Поллинг участников каждые 2 сек
useIntervalFn(() => {
  store.fetchParticipants()
}, 2000)
</script>