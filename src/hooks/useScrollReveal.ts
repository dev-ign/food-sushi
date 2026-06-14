import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

interface ScrollRevealOptions {
  /** Initial y offset in px. Default: 40 */
  y?: number
  /** Stagger seconds between siblings. Default: 0.1 */
  stagger?: number
  /** Trigger start position. Default: "top 88%" */
  start?: string
  /** Animation duration. Default: 0.75 */
  duration?: number
  /** Delay before animation starts. Default: 0 */
  delay?: number
}

/**
 * Applies a fade-in + slide-up reveal to all [data-reveal] children
 * within the given container ref. Reverses on scroll back up.
 */
export function useScrollReveal<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 40,
    stagger = 0.1,
    start = 'top 88%',
    duration = 0.75,
    delay = 0,
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const targets = container.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!targets.length) return

    // Set initial hidden state
    gsap.set(targets, { opacity: 0, y })

    const batch = ScrollTrigger.batch(targets, {
      start,
      onEnter: (els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power2.out',
          overwrite: true,
        })
      },
      onLeave: (els) => {
        gsap.to(els, {
          opacity: 0,
          y: -y * 0.6,
          duration: duration * 0.6,
          stagger,
          overwrite: true,
        })
      },
      onEnterBack: (els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power2.out',
          overwrite: true,
        })
      },
      onLeaveBack: (els) => {
        gsap.to(els, {
          opacity: 0,
          y,
          duration: duration * 0.6,
          stagger,
          overwrite: true,
        })
      },
    })

    return () => {
      batch.forEach((st) => st.kill())
      gsap.set(targets, { clearProps: 'all' })
    }
  }, [containerRef, y, stagger, start, duration, delay])
}
