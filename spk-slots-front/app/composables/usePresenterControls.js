import { onKeyStroke } from '@vueuse/core'
import { useRaffleStore } from '~/stores/raffle'

export function usePresenterControls() {
  const store = useRaffleStore()

  onKeyStroke([' ', 'Enter', 'ArrowRight', 'PageDown'], (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
    e.preventDefault()
    store.nextStep()
  })

  onKeyStroke(['s', 'S', 'ы', 'Ы'], () => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
    store.isSettingsOpen = !store.isSettingsOpen
  })
}