import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SCENES } from '../lib/scenes.js'
import SceneCard from '../ui/SceneCard.jsx'
import styles from './selectScene.module.css'

export default function SelectScene() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.headerCenter}>
          <h1 className={styles.gameTitle}>Spot the Differences</h1>
        </div>
      </header>

      <main className={styles.content}>
        <p className={styles.intro}>Choose a scene and spot all five hidden differences.</p>

        <section className={styles.cardsGrid} aria-label="Scene selection">
          {SCENES.map((scene, index) => (
            <SceneCard
              key={scene.id}
              imageUrl={scene.cardImage}
              title={scene.title}
              index={index}
              onClick={() => navigate(`/game/${scene.id}`)}
            />
          ))}
        </section>
      </main>
    </div>
  )
}
