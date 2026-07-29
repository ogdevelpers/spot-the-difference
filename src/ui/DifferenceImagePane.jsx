import React, { useRef, useState } from 'react'
import styles from './differenceImagePane.module.css'

export default function DifferenceImagePane({
  imageUrl,
  alt,
  hotspots,
  foundIds,
  lastFoundId,
  onPick,
  interactive = false,
  aspectRatio,
}) {
  const wrapRef = useRef(null)
  const [ripples, setRipples] = useState([])

  function handleClick(e) {
    if (!interactive) return
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    if (nx < 0 || ny < 0 || nx > 1 || ny > 1) return

    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setRipples((prev) => [...prev, { id, x: nx, y: ny }])
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 520)

    onPick?.({ x: nx, y: ny })
  }

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${interactive ? styles.interactive : ''}`}
      style={{ aspectRatio: aspectRatio ? `${aspectRatio.w} / ${aspectRatio.h}` : '16 / 9' }}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <img className={styles.image} src={imageUrl} alt={alt} draggable={false} />

      <div className={styles.overlay} aria-hidden="true">
        {hotspots.map((h) => {
          const foundOrder = foundIds.indexOf(h.id)
          if (foundOrder < 0) return null
          const newest = lastFoundId === h.id
          return (
            <div
              key={h.id}
              className={`${styles.box} ${styles.found} ${newest ? styles.newest : ''}`}
              style={{
                left: `${h.x * 100}%`,
                top: `${h.y * 100}%`,
                width: `${h.w * 100}%`,
                height: `${h.h * 100}%`,
              }}
            >
              <span className={styles.ring} />
              <span className={styles.label}>{foundOrder + 1}</span>
            </div>
          )
        })}

        {ripples.map((r) => (
          <span
            key={r.id}
            className={styles.ripple}
            style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}
