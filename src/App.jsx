import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SelectScene from './pages/SelectScene.jsx'
import Game from './pages/Game.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SelectScene />} />
      <Route path="/game/:sceneId" element={<Game />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

