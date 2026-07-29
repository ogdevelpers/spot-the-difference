import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BETTER_LUCK,
  GAME_DURATION_SECONDS,
  THANK_YOU,
  getSceneById,
} from '../lib/scenes.js'
import DifferenceImagePane from '../ui/DifferenceImagePane.jsx'
import styles from './game.module.css'

function normalizePick(x, y) {
  return { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) }
}

const PRAISE = ['Nice!', 'Sharp eye!', 'Great spot!', 'Bullseye!', 'Gotcha!']
const CONFETTI = Array.from({ length: 28 }, (_, i) => i)

export default function Game() {
  const navigate = useNavigate()
  const { sceneId } = useParams()
  const scene = useMemo(() => getSceneById(sceneId), [sceneId])

  const [foundIds, setFoundIds] = useState([])
  const [missFlash, setMissFlash] = useState(false)
  const [lastFoundId, setLastFoundId] = useState(null)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS)
  // 'playing' | 'won' | 'lost'
  const [phase, setPhase] = useState('playing')
  const [showResult, setShowResult] = useState(false)
  const [toast, setToast] = useState(null)

  const hotspots = scene?.differences || []
  const foundCount = foundIds.length
  const totalCount = hotspots.length
  const progress = totalCount ? (foundCount / totalCount) * 100 : 0
  const timePercent = (timeLeft / GAME_DURATION_SECONDS) * 100
  const lowTime = timeLeft <= 10 && phase === 'playing'
  const aspectRatio = { w: 16, h: 9 }

  const intervalRef = useRef(null)

  const clearTimer = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Countdown while playing.
  useEffect(() => {
    if (phase !== 'playing') return undefined
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer()
          setPhase('lost')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return clearTimer
  }, [phase])

  // Win when all differences found.
  useEffect(() => {
    if (phase === 'playing' && totalCount > 0 && foundCount === totalCount) {
      clearTimer()
      setPhase('won')
    }
  }, [foundCount, totalCount, phase])

  // Reveal the result page shortly after the game ends.
  useEffect(() => {
    if (phase === 'playing') {
      setShowResult(false)
      return undefined
    }
    const delay = phase === 'won' ? 650 : 250
    const t = window.setTimeout(() => setShowResult(true), delay)
    return () => window.clearTimeout(t)
  }, [phase])

  const showToast = (text, tone) => {
    const id = Date.now()
    setToast({ id, text, tone })
    window.setTimeout(() => {
      setToast((cur) => (cur && cur.id === id ? null : cur))
    }, 900)
  }

  const pickHotspotAt = (pt) => {
    if (phase !== 'playing') return
    const p = normalizePick(pt.x, pt.y)
    for (const h of hotspots) {
      if (foundIds.includes(h.id)) continue
      if (p.x >= h.x && p.x <= h.x + h.w && p.y >= h.y && p.y <= h.y + h.h) {
        setLastFoundId(h.id)
        setFoundIds((prev) => [...prev, h.id])
        showToast(PRAISE[foundCount % PRAISE.length], 'good')
        return
      }
    }
    setMissFlash(true)
    showToast('Keep looking', 'miss')
    window.setTimeout(() => setMissFlash(false), 320)
  }

  const restart = () => {
    clearTimer()
    setFoundIds([])
    setLastFoundId(null)
    setTimeLeft(GAME_DURATION_SECONDS)
    setShowResult(false)
    setToast(null)
    setPhase('playing')
  }

  if (!scene) {
    return <div className={styles.status}>Scene not found.</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />

      <header className={styles.topBar}>
        <button type="button" className={styles.backButton} onClick={() => navigate('/')}>
          Back
        </button>

        <div className={styles.hud}>
          <div className={styles.hudText}>
            <span className={styles.sceneName}>{scene.title}</span>
            <span className={styles.score}>
              {foundCount}
              <span className={styles.scoreSlash}>/</span>
              {totalCount}
            </span>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.dots} aria-hidden="true">
            {hotspots.map((h) => (
              <span
                key={h.id}
                className={`${styles.dot} ${foundIds.includes(h.id) ? styles.dotOn : ''}`}
              />
            ))}
          </div>
        </div>

        <div className={`${styles.timer} ${lowTime ? styles.timerLow : ''}`}>
          <svg className={styles.timerRing} viewBox="0 0 40 40" aria-hidden="true">
            <circle className={styles.timerTrack} cx="20" cy="20" r="17" />
            <circle
              className={styles.timerProgress}
              cx="20"
              cy="20"
              r="17"
              style={{ strokeDashoffset: 106.8 - (106.8 * timePercent) / 100 }}
            />
          </svg>
          <span className={styles.timerValue}>{timeLeft}</span>
        </div>
      </header>

      <main className={styles.main}>
        {toast && (
          <div
            key={toast.id}
            className={`${styles.toast} ${toast.tone === 'good' ? styles.toastGood : styles.toastMiss}`}
          >
            {toast.text}
          </div>
        )}

        <div className={`${styles.board} ${missFlash ? styles.miss : ''}`}>
          <div className={styles.pane}>
            <div className={styles.paneLabel}>Original</div>
            <DifferenceImagePane
              imageUrl={scene.leftImage}
              alt={`${scene.title} - original`}
              hotspots={hotspots}
              foundIds={foundIds}
              lastFoundId={lastFoundId}
              interactive={phase === 'playing'}
              aspectRatio={aspectRatio}
              onPick={pickHotspotAt}
            />
          </div>

          <div className={styles.pane}>
            <div className={styles.paneLabel}>Modified</div>
            <DifferenceImagePane
              imageUrl={scene.rightImage}
              alt={`${scene.title} - modified`}
              hotspots={hotspots}
              foundIds={foundIds}
              lastFoundId={lastFoundId}
              interactive={phase === 'playing'}
              aspectRatio={aspectRatio}
              onPick={pickHotspotAt}
            />
          </div>
        </div>

        <p className={styles.hint}>
          {phase === 'won'
            ? 'All differences found'
            : phase === 'lost'
              ? "Time's up"
              : 'Compare both images and tap each difference before time runs out'}
        </p>
      </main>

      {showResult && (
        <div
          className={styles.result}
          role="dialog"
          aria-modal="true"
          aria-label={phase === 'won' ? 'Thank you' : 'Better luck next time'}
        >
          <img
            className={styles.resultImg}
            src={phase === 'won' ? THANK_YOU : BETTER_LUCK}
            alt={phase === 'won' ? 'Thank you for participating!' : 'Better luck next time'}
          />

          {phase === 'won' && (
            <div className={styles.confetti} aria-hidden="true">
              {CONFETTI.map((i) => (
                <span
                  key={i}
                  className={styles.confettiPiece}
                  style={{
                    left: `${(i * 37) % 100}%`,
                    animationDelay: `${(i % 7) * 0.12}s`,
                    background: i % 3 === 0 ? 'var(--gold-soft)' : i % 3 === 1 ? 'var(--amber)' : '#fff',
                  }}
                />
              ))}
            </div>
          )}
          <div className={styles.resultActions}>
            <button type="button" className={styles.primary} onClick={() => navigate('/')}>
              Choose another scene
            </button>
            <button type="button" className={styles.ghost} onClick={restart}>
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
