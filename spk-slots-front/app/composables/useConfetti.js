import confetti from 'canvas-confetti'

export function useConfetti() {
  function fireWinnerConfetti() {
    const duration = 3500
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#F7C114', '#D55238', '#3E4A9E', '#FFFFFF']
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#F7C114', '#D55238', '#3E4A9E', '#FFFFFF']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  return { fireWinnerConfetti }
}