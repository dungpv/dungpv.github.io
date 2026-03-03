import { useEffect, useRef, useState } from 'react'

export function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, options.threshold])

  return inView
}
