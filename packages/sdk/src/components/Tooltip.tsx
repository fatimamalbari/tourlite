import React from 'react'
import { createPortal } from 'react-dom'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  FloatingArrow,
  Placement,
} from '@floating-ui/react'
import { TourStep } from '../types'

interface TooltipProps {
  step: TourStep
  targetElement: Element | null
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  isLast: boolean
  isFirst: boolean
  totalSteps: number
  currentStepIndex: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  step,
  targetElement,
  onNext,
  onPrev,
  onClose,
  isLast,
  isFirst,
  totalSteps,
  currentStepIndex,
}) => {
  const arrowRef = React.useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    elements: {
      reference: targetElement,
    },
    placement: (step.position as Placement) || 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(12),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  })

  const style = targetElement 
    ? floatingStyles 
    : {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }

  return createPortal(
    <div
      ref={refs.setFloating}
      style={{
        ...style,
        background: 'white',
        color: '#1a1a1a',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        maxWidth: '320px',
        border: '1px solid #f0f0f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
      }}
    >
      {targetElement && <FloatingArrow ref={arrowRef} context={context} fill="white" stroke="#f0f0f0" strokeWidth={1} />}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0070f3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Step {currentStepIndex + 1} of {totalSteps}
        </span>
        <button 
          onClick={onClose}
          style={{ 
            border: 'none', 
            background: 'none', 
            padding: '4px', 
            cursor: 'pointer',
            color: '#999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close tour"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 700 }}>{step.title}</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>{step.content}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={onPrev}
          disabled={isFirst}
          style={{ 
            padding: '6px 0', 
            fontSize: '0.85rem', 
            fontWeight: 600,
            cursor: isFirst ? 'default' : 'pointer',
            background: 'none',
            border: 'none',
            color: isFirst ? '#d1d5db' : '#6b7280',
            transition: 'color 0.2s'
          }}
        >
          Back
        </button>
        <button 
          onClick={onNext}
          style={{ 
            padding: '8px 16px', 
            fontSize: '0.85rem', 
            fontWeight: 700,
            cursor: 'pointer',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 112, 243, 0.2)',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0062d6')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0070f3')}
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>,
    document.body
  )
}
