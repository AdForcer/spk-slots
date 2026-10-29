<template>
  <main class="relative w-screen h-screen overflow-hidden select-none">
    <LayoutAbstractBackground />

    <Transition name="fade" mode="out-in">
      <SlidesSlideQr v-if="store.stage === 'qr'" key="qr" />
      <SlidesSlideWheel
        v-else-if="store.stage === 'wheel' || store.stage === 'spinning'"
        key="wheel"
      />
      <SlidesSlideWinner v-else-if="store.stage === 'winner'" key="winner" />
    </Transition>

    <LayoutSettingsModal />
  </main>
</template>

<script setup>
import { useRaffleStore } from '~/stores/raffle'
import { usePresenterControls } from '~/composables/usePresenterControls'

const store = useRaffleStore()
usePresenterControls()

onMounted(async () => {
  await store.fetchConfig()
  await store.fetchParticipants()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>