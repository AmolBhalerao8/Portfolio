// Simple React test without Three.js first
import { useState } from 'react'

export default function TestApp() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#1a1a2e', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ color: '#00d4ff', fontSize: '3rem', marginBottom: '1rem' }}>
        React is Working! ✓
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        Count: {count}
      </p>
      <button 
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          background: '#00d4ff',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>
      <p style={{ marginTop: '2rem', color: '#888' }}>
        If you can see this and click the button, React is working correctly.
      </p>
    </div>
  )
}
