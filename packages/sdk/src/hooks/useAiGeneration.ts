import { useState, useCallback } from 'react'
import { useTour } from '../components/TourProvider'
import { scanPage } from '../utils/scanner'

export function useAiGeneration() {
  const { startTour } = useTour()
  const [isGenerating, setIsGenerating] = useState(false)

  const generate = useCallback(async (goal: string) => {
    if (!goal || !goal.trim()) {
      throw new Error('Please provide a goal for AI generation.')
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
      return tour
    } catch (error) {
      console.error('AI Generation Hook Error:', error)
      throw new Error('AI generation failed. See console for details.')
    } finally {
      setIsGenerating(false)
    }
  }, [startTour])

  return {
    generate,
    isGenerating,
  }
}
