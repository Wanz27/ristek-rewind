import { useState, useEffect } from 'react'
import './App.css'

// 25 Juni 2026 pukul 18:00 WIB (UTC+7) => 11:00 UTC
const TARGET_DATE = new Date('2026-06-25T11:00:00Z')

function getTimeLeft() {
  const diff = TARGET_DATE - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function App() {
  const [time, setTime] = useState(getTimeLeft())

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
            <span className="card-label">Countdown</span>
          </div>
          <div className="timer">
            <span className="time-unit">
              <span className="time-value">{pad(time.d)}</span>
              <span className="time-label">Hari</span>
            </span>
            <span className="time-sep">:</span>
            <span className="time-unit">
              <span className="time-value">{pad(time.h)}</span>
              <span className="time-label">Jam</span>
            </span>
            <span className="time-sep">:</span>
            <span className="time-unit">
              <span className="time-value">{pad(time.m)}</span>
              <span className="time-label">Menit</span>
            </span>
            <span className="time-sep">:</span>
            <span className="time-unit">
              <span className="time-value">{pad(time.s)}</span>
              <span className="time-label">Detik</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
