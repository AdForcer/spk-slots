<template>
  <div
    v-if="store.isSettingsOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    @click.self="store.isSettingsOpen = false"
  >
    <div class="bg-stone-1000 text-white p-6 sm:p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-white/10">
      <h2 class="text-2xl font-bold mb-5">Настройки</h2>

      <div class="mb-6">
        <label class="block text-sm text-slate-300 font-medium mb-2">
          Ссылка на Telegram-бота (QR-код):
        </label>
        <input
          v-model="localUrl"
          type="text"
          placeholder="https://t.me/..."
          class="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-slate-700 text-white focus:outline-none focus:border-[#F7C114]"
          @keyup.enter="save"
        />
      </div>

      <div class="mb-7">
        <div class="flex justify-between text-sm mb-2">
          <span class="text-slate-300 font-medium">Время вращения колеса:</span>
          <span class="text-[#F7C114] font-bold">{{ store.spinDuration }} сек</span>
        </div>
        <input
          v-model.number="store.spinDuration"
          type="range"
          min="2"
          max="60"
          step="0.5"
          class="w-full accent-[#F7C114] cursor-pointer"
        />
      </div>

      <div class="flex justify-end gap-3">
        <button
          @click="store.isSettingsOpen = false"
          class="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl transition"
        >
          Отмена
        </button>
        <button
          @click="save"
          class="bg-[#F7C114] hover:bg-[#ffcf33] text-slate-900 font-bold px-6 py-2.5 rounded-xl transition"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRaffleStore } from '~/stores/raffle'

const store = useRaffleStore()
const localUrl = ref(store.botUrl)

watch(
  () => store.isSettingsOpen,
  (isOpen) => {
    if (isOpen) localUrl.value = store.botUrl
  }
)

async function save() {
  if (localUrl.value.trim() && localUrl.value.trim() !== store.botUrl) {
    await store.updateBotUrl(localUrl.value.trim())
  }
  store.isSettingsOpen = false
}
</script>