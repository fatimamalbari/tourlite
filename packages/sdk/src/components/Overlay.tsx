import React, { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

interface OverlayProps {
  targetElement: Element | null
}

export const Overlay: React.FC<OverlayProps> = ({ targetElement }) => {
  const [rect, setRect] = useState<DOMRect | null>(null)

  useLayoutEffect(() => {
    if (!targetElement) {
      setRect(null)
      return
    }

    const update = () => {
      setRect(targetElement.getBoundingClientRect())
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [targetElement])

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={rect.left - 8}
                y={rect.top - 8}
                width={rect.width + 16}
                height={rect.height + 16}
                rx="8"
                fill="black"
                style={{ transition: 'all 0.3s ease-out' }}
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.5)"
          mask="url(#spotlight-mask)"
          style={{ pointerEvents: 'auto' }}
        />
      </svg>
    </div>,
    document.body
  )
}
