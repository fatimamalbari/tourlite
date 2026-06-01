'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, X, Wand2 } from 'lucide-react'

interface GenerateTourModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (goal: string) => void
  isGenerating: boolean
}

export const GenerateTourModal: React.FC<GenerateTourModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  isGenerating
}) => {
  const [goal, setGoal] = useState('Show me the dashboard features')

  // Reset goal when opening
  useEffect(() => {
    if (isOpen) setGoal('Show me the dashboard features')
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Panel */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-[var(--tl-radius)] border border-[var(--tl-border-strong)] bg-[var(--tl-panel)] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--tl-border)] px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--tl-accent-soft)]">
              <Sparkles className="h-4 w-4 text-[var(--tl-accent)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-[var(--tl-fg)]">Generate AI Tour</h3>
              <p className="text-xs text-[var(--tl-faint)]">Powered by TourLite Intelligence</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--tl-faint)] transition-colors hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-[var(--tl-faint)]">
            What should this tour explain?
          </label>
          <div className="relative">
            <textarea
              autoFocus
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. 'Show me how to manage my team members'"
              rows={4}
              className="w-full resize-none rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel-2)] px-4 py-3 text-[14px] text-[var(--tl-fg)] outline-none transition-all focus:border-[var(--tl-accent)] focus:ring-1 focus:ring-[var(--tl-accent)]"
            />
            <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 opacity-20">
              <Wand2 className="h-4 w-4" />
            </div>
          </div>
          
          <div className="mt-4 rounded-lg bg-[var(--tl-accent-soft)] p-3 text-[12px] leading-relaxed text-[var(--tl-muted)]">
            <span className="font-semibold text-[var(--tl-accent)]">Pro tip:</span> Be specific! Our AI works best when you describe exactly what you want the user to accomplish.
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[var(--tl-border)] bg-[var(--tl-panel-2)] px-6 py-4">
          <button
            onClick={onClose}
            className="text-[13px] font-medium text-[var(--tl-muted)] transition-colors hover:text-[var(--tl-fg)]"
          >
            Cancel
          </button>
          <button
            onClick={() => onGenerate(goal)}
            disabled={isGenerating || !goal.trim()}
            className="flex items-center gap-2 rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] px-5 py-2 text-[13px] font-bold text-[var(--tl-accent-fg)] transition-all hover:opacity-90 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--tl-accent-fg)] border-t-transparent" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-[var(--tl-accent-fg)]" />
                <span>Generate Magic Tour</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
