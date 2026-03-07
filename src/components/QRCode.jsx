import React from 'react'

const PATTERN = [
  [1,1,1,1,1,1,1,0,1,0],[1,0,0,0,0,0,1,0,0,1],[1,0,1,1,1,0,1,0,1,0],
  [1,0,1,1,1,0,1,0,0,1],[1,0,1,1,1,0,1,0,1,1],[1,0,0,0,0,0,1,0,0,0],
  [1,1,1,1,1,1,1,0,1,0],[0,0,0,0,0,0,0,0,0,1],[1,0,1,1,0,1,1,0,1,0],
  [0,1,0,0,1,0,0,1,0,1],
]

export default function QRCode() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      gap: 2,
      width: '100%',
      height: '100%',
      padding: 8,
      background: 'white',
    }}>
      {PATTERN.flat().map((cell, i) => (
        <div key={i} style={{
          background: cell ? '#000' : '#fff',
          borderRadius: 1,
        }} />
      ))}
    </div>
  )
}
