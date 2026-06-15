import { useState, useEffect } from 'react'
import './App.css'

// Set your event date here
const TARGET_DATE = new Date('2026-08-17T19:00:00')

function getTimeLeft() {
  const diff = TARGET_DATE - Date.now()
  if (diff <= 0) return { h: 0, m: 0, s: 0 }
  return {
    h: Math.floor(diff / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function App() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="page">
      {/* Top-left swirl decoration */}
      <img src="/assets/swirl.svg" className="deco deco-swirl" alt="" aria-hidden="true" />

      {/* Top-right rewind button */}
      <img src="/assets/rewind-btn.svg" className="deco deco-rewind-btn" alt="" aria-hidden="true" />

      {/* Left-side asterisk stars */}
      <img src="/assets/asterisks.svg" className="deco deco-asterisks" alt="" aria-hidden="true" />

      {/* Bottom-right wave */}
      <img src="/assets/wave-blue.svg" className="deco deco-wave" alt="" aria-hidden="true" />

      {/* Main content */}
      <div className="content">
        {/* Brand title */}
        <div className="brand">
          <img src="/assets/ristek-logo.svg" className="ristek-logo" alt="RISTEK" />
          <img src="/assets/rewind-label.svg" className="rewind-label" alt="REWIND" />
        </div>

        {/* Neo-brutalism countdown card */}
        <div className="card">
          <div className="card-header">
            <span className="card-label">Coutdown</span>
            <span className="card-exclaim">!</span>
          </div>
          <div className="timer">
            {pad(time.h)}:{pad(time.m)}
          </div>
        </div>
      </div>
    </div>
  )
}
