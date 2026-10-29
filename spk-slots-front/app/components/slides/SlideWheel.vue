<template>
  <div class="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-6">
    <div class="relative flex items-center justify-center w-[min(82vw,68vh)] aspect-square">
      <div class="w-full h-full rounded-full p-[2.2%] bg-white/15 backdrop-blur-sm shadow-2xl">
        <canvas
          ref="canvasRef"
          width="800"
          height="800"
          class="w-full h-full rounded-full block"
        />
      </div>

      <svg
        class="absolute right-[1.2%] w-[8.5%] h-auto drop-shadow-md pointer-events-none"
        viewBox="0 0 60 40"
        fill="none"
      >
        <polygon points="0,20 42,4 58,20 42,36" fill="#F7C114" />
      </svg>
    </div>

    <div class="h-[8vh] flex items-center justify-center mt-[2.5vmin]">
      <button
        v-if="store.stage === 'wheel'"
        @click="store.nextStep()"
        class="bg-[#F7C114] hover:bg-[#ffcf33] text-slate-900 font-bold text-[clamp(1rem,2.2vmin,1.4rem)] px-7 py-3 rounded-2xl shadow-lg transition active:scale-95"
      >
        Крутить колесо
      </button>
    </div>

    <button
      v-if="store.stage === 'wheel'"
      @click="store.isSettingsOpen = true"
      class="fixed bottom-4 right-4 bg-black/25 hover:bg-black/40 text-white/80 px-3.5 py-2 rounded-xl text-xs sm:text-sm transition"
    >
     Настройки (S)
    </button>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { useIntervalFn } from '@vueuse/core'
import { useRaffleStore } from '~/stores/raffle'

const store = useRaffleStore()
const canvasRef = ref(null)
const currentRotation = ref(0)

// каждые 2 секунды подтягиваем новых участников с бэкенда
const { pause: pausePolling } = useIntervalFn(() => {
  if (store.stage === 'wheel') {
    store.fetchParticipants()
  }
}, 2000)

function drawWheel() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const size = canvas.width
  const center = size / 2
  const radius = center - 6

  ctx.clearRect(0, 0, size, size)

  const items = store.participants.length
    ? store.participants
    : [{ id: 0, number: '?' }]

  const total = items.length
  const arcSize = (2 * Math.PI) / total
  const rotRad = (currentRotation.value * Math.PI) / 180

  const fontSize = Math.max(14, Math.min(36, Math.floor((2 * Math.PI * radius) / (total * 2.8))))

  items.forEach((item, i) => {
    const startAngle = rotRad + i * arcSize
    const endAngle = startAngle + arcSize

    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.arc(center, center, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = i % 2 === 0 ? '#3E4A9E' : '#C85A40'
    ctx.fill()

    ctx.lineWidth = total > 40 ? 1 : 2
    ctx.strokeStyle = '#333652'
    ctx.stroke()

    ctx.save()
    ctx.translate(center, center)
    ctx.rotate(startAngle + arcSize / 2)
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#F7C114'
    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.fillText(String(item.number), radius - 38, 0)
    ctx.restore()
  })
}

watch(() => [store.participants, currentRotation.value], drawWheel, { deep: true })

watch(
  () => store.stage,
  (newStage) => {
    if (newStage === 'spinning' && store.winner) {
      pausePolling()
      spinToWinner(store.winner)
    }
  }
)

function spinToWinner(winnerObj) {
  const items = store.participants
  const total = items.length
  const winnerIndex = items.findIndex(
    p => p.id === winnerObj.id || p.number === winnerObj.number
  )

  const targetIdx = winnerIndex !== -1 ? winnerIndex : 0
  const sliceDeg = 360 / total

  const sectorCenterDeg = targetIdx * sliceDeg + sliceDeg / 2
  const targetMod = (360 - sectorCenterDeg + 360) % 360
  const currentMod = ((currentRotation.value % 360) + 360) % 360
  const delta = (targetMod - currentMod + 360) % 360

  const randomOffset = (Math.random() - 0.5) * (sliceDeg * 0.55)

  const duration = Number(store.spinDuration) || 6.5
  const spins = Math.max(4, Math.round(duration * 1.3))
  const finalAngle = currentRotation.value + 360 * spins + delta + randomOffset

  gsap.to(currentRotation, {
    value: finalAngle,
    duration,
    ease: 'power4.out',
    onUpdate: drawWheel,
    onComplete: () => {
      setTimeout(() => {
        store.finishSpin()
      }, 1200)
    }
  })
}

onMounted(() => {
  drawWheel()
})
</script>