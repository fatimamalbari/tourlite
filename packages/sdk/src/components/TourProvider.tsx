import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Tour, TourContextType, TourStep } from '../types'
import { Tooltip } from './Tooltip'
import { Overlay } from './Overlay'
import { AiBuilder } from './AiBuilder'

const TourContext = createContext<TourContextType | undefined>(undefined)

export const useTour = () => {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error('useTour must be used within a TourProvider')
  }
  return context
}

interface TourProviderProps {
  children: ReactNode
  enableBuilder?: boolean
}

export const TourProvider: React.FC<TourProviderProps> = ({ children, enableBuilder = false }) => {
  const [activeTour, setActiveTour] = useState<Tour | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [targetElement, setTargetElement] = useState<Element | null>(null)

  const startTour = useCallback((tour: Tour) => {
    setActiveTour(tour)
    setCurrentStepIndex(0)
  }, [])

  const endTour = useCallback(() => {
    setActiveTour(null)
    setCurrentStepIndex(0)
    setTargetElement(null)
  }, [])

  const nextStep = useCallback(() => {
    if (activeTour && currentStepIndex < activeTour.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      endTour()
    }
  }, [activeTour, currentStepIndex, endTour])

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }, [currentStepIndex])

  const currentStep = activeTour?.steps[currentStepIndex]

  React.useLayoutEffect(() => {
    if (currentStep?.target) {
      const el = document.querySelector(currentStep.target)
      setTargetElement(el)
    } else {
      setTargetElement(null)
    }
  }, [currentStep])

  return (
    <TourContext.Provider
      value={{
        activeTour,
        currentStepIndex,
        startTour,
        nextStep,
        prevStep,
        endTour,
      }}
    >
      {children}
      {enableBuilder && <AiBuilder />}
      {activeTour && currentStep && (
        <>
          <Overlay targetElement={targetElement} />
          <Tooltip
            step={currentStep}
            targetElement={targetElement}
            onNext={nextStep}
            onPrev={prevStep}
            onClose={endTour}
            isFirst={currentStepIndex === 0}
            isLast={currentStepIndex === activeTour.steps.length - 1}
            totalSteps={activeTour.steps.length}
            currentStepIndex={currentStepIndex}
          />
        </>
      )}
    </TourContext.Provider>
  )
}
