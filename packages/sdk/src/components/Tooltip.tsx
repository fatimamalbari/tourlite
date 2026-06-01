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
import { Sparkles, X } from 'lucide-react'
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

  // Aurora Theme Colors
  const colors = {
    bg: '#181c1c',
    border: '#2f3534',
    fg: '#e7eceb',
    muted: '#97a19f',
    accent: '#2dd4bf',
    accentFg: '#04110f',
  }

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
        background: colors.bg,
        color: colors.fg,
        padding: '20px',
        borderRadius: '14px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        maxWidth: '300px',
        border: `1px solid ${colors.border}`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
      }}
    >
      {targetElement && (
        <FloatingArrow 
          ref={arrowRef} 
          context={context} 
          fill={colors.bg} 
          stroke={colors.border} 
          strokeWidth={1} 
        />
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            fontSize: '10px', 
            fontWeight: 700, 
            background: colors.accent, 
            color: colors.accentFg,
            padding: '2px 8px',
            borderRadius: '10px',
            textTransform: 'uppercase'
          }}>
            {currentStepIndex + 1} / {totalSteps}
          </span>
          <Sparkles size={12} color={colors.accent} />
        </div>
        <button 
          onClick={onClose}
          style={{ 
            border: 'none', 
            background: 'none', 
            padding: '4px', 
            cursor: 'pointer',
            color: colors.muted,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={14} />
        </button>
      </div>

      <h3 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 600 }}>{step.title}</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: colors.muted, lineHeight: 1.6 }}>{step.content}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={onPrev}
          disabled={isFirst}
          style={{ 
            fontSize: '12px', 
            fontWeight: 500,
            cursor: isFirst ? 'default' : 'pointer',
            background: 'none',
            border: 'none',
            color: isFirst ? '#444' : colors.muted,
          }}
        >
          Back
        </button>
        <button 
          onClick={onNext}
          style={{ 
            padding: '6px 16px', 
            fontSize: '12px', 
            fontWeight: 600,
            cursor: 'pointer',
            background: colors.accent,
            color: colors.accentFg,
            border: 'none',
            borderRadius: '8px',
            transition: 'opacity 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>,
    document.body
  )
}
