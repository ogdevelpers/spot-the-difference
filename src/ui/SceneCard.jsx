import React from 'react'
import styles from './sceneCard.module.css'

export default function SceneCard({ imageUrl, title, onClick, index = 0 }) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={onClick}
      aria-label={`Play ${title}`}
      style={{ animationDelay: `${140 + index * 80}ms` }}
    >
      <span className={styles.shine} aria-hidden="true" />
      <img className={styles.image} src={imageUrl} alt="" />

      <span className={styles.overlay}>
        <span className={styles.cta}>Play</span>
      </span>
    </button>
  )
}
