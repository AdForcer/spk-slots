<template>
  <div class="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4 py-6">
    <h1 class="text-white text-[clamp(2rem,6vmin,5rem)] font-normal tracking-wide mb-[2.5vmin] drop-shadow leading-tight">
      Поздравляем с победой!
    </h1>

    <div class="text-[clamp(1.75rem,5vmin,4.25rem)] font-extrabold text-white mb-[1.5vmin] drop-shadow">
      Номер: <span class="text-[#F7C114]">{{ store.winner?.number }}</span>
    </div>

    <div
      v-if="store.winner?.name"
      class="text-[clamp(1.25rem,3.5vmin,2.75rem)] font-semibold text-white/90 mt-1"
    >
      {{ store.winner.name }}
    </div>

    <button
      @click="store.nextStep()"
      class="mt-[6vmin] bg-white/15 hover:bg-white/25 text-white font-medium text-[clamp(0.9rem,1.8vmin,1.2rem)] px-6 py-3 rounded-xl backdrop-blur-sm transition active:scale-95"
    >
      Новый розыгрыш
    </button>
  </div>
</template>

<script setup>
import { useRaffleStore } from '~/stores/raffle'
import { useConfetti } from '~/composables/useConfetti'

const store = useRaffleStore()
const { fireWinnerConfetti } = useConfetti()

onMounted(() => {
  fireWinnerConfetti()
})
</script>