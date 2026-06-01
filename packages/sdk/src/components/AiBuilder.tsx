import React, { useState } from 'react'
import { useTour } from './TourProvider'
import { scanPage } from '../utils/scanner'

export const AiBuilder: React.FC = () => {
  const { startTour } = useTour()
  const [goal, setGoal] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleGenerate = async () => {
    if (!goal.trim()) {
      alert('Please enter a goal before generating a tour.')
      return
    }
    setIsGenerating(true)

    try {
      const elements = scanPage()
      const response = await fetch('/api/generate-tour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, elements }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate tour')
      }

      const tour = await response.json()
      startTour(tour)
      setIsOpen(false)
    } catch (error) {
      console.log('Error generating tour...', error)
      alert('Error generating tour. Make sure your API route is set up.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '28px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}
        title="AI Tour Builder"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '350px',
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        zIndex: 10000,
        border: '1px solid #f0f0f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>AI Tour Builder</h3>
        <button onClick={() => setIsOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}>
          ✕
        </button>
      </div>
      
      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px' }}>
        Describe what you want to explain, and our AI will build the tour for you.
      </p>

      <label htmlFor="ai-tour-goal" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
        Tour goal
      </label>
      <input
        id="ai-tour-goal"
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="e.g. 'Show how to use the dashboard'"
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '16px',
          fontSize: '0.9rem',
          outline: 'none',
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
      />

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !goal}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          background: isGenerating ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          fontWeight: 700,
          cursor: isGenerating ? 'default' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {isGenerating ? 'Generating...' : 'Generate Magic Tour ✨'}
      </button>
    </div>
  )
}
