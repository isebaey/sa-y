/**
 * Composable for playing a satisfying completion chime.
 * Uses Web Audio API — no external sound files needed.
 */
export function useCompletionSound() {
  let ctx: AudioContext | null = null

  function getContext(): AudioContext {
    if (!ctx) {
      ctx = new AudioContext()
    }
    return ctx
  }

  /** Play a short, pleasant "ding" sound */
  function playDone() {
    if (!import.meta.client) return

    try {
      const audioCtx = getContext()
      const now = audioCtx.currentTime

      // Two-tone chime: C5 → E5
      const freqs = [523.25, 659.25]
      freqs.forEach((freq, i) => {
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + i * 0.08)

        gain.gain.setValueAtTime(0.15, now + i * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3)

        osc.connect(gain)
        gain.connect(audioCtx.destination)

        osc.start(now + i * 0.08)
        osc.stop(now + i * 0.08 + 0.3)
      })
    } catch {
      // Silently fail — sound is non-critical
    }
  }

  return { playDone }
}
