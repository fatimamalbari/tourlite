export interface TourStep {
  id: string
  title: string
  content: string
  target?: string // CSS selector
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export interface Tour {
  id: string
  steps: TourStep[]
}

export interface TourContextType {
  activeTour: Tour | null
  currentStepIndex: number
  startTour: (tour: Tour) => void
  nextStep: () => void
  prevStep: () => void
  endTour: () => void
}
