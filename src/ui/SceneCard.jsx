import React from 'react'
import styles from './sceneCard.module.css'

export default function SceneCard({ imageUrl, title, onClick, index = 0 }) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={onClick}
      style={{ animationDelay: `${140 + index * 80}ms` }}
    >
      <span className={styles.shine} aria-hidden="true" />
      <img className={styles.image} src={imageUrl} alt="" />

      <span className={styles.overlay}>
        <span className={styles.index}>0{index + 1}</span>

        <span className={styles.footerRow}>
          <span className={styles.title}>{title}</span>
          <span className={styles.cta}>Play</span>
        </span>
      </span>
    </button>
  )
}
