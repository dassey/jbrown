import { useEffect, useRef, useState } from 'react'

/** Track an element's pixel size (ResizeObserver). */
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setSize({ width: el.clientWidth, height: el.clientHeight })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    measure()
    // Fallback for environments where the element starts at 0 and the observer
    // misses the first real layout (e.g. a container that mounts at zero size).
    window.addEventListener('resize', measure)
    const raf = requestAnimationFrame(measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(raf)
    }
  }, [])
  return { ref, size }
}
