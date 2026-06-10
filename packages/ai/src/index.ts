import { GoogleGenerativeAI } from '@google/generative-ai'

export interface ScannedElement {
  id: string
  tag: string
  text: string
  selector: string
  role?: string
  placeholder?: string
}

export interface TourStep {
  id: string
  title: string
  content: string
  target: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export interface GeneratedTour {
  id: string
  steps: TourStep[]
}

export class TourAIGenerator {
  private genAI: GoogleGenerativeAI

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  async generateTour(goal: string, elements: ScannedElement[]): Promise<GeneratedTour> {
    console.log('[TourAI] Starting generation with model: gemini-2.5-flash')
    console.log('[TourAI] Goal:', goal)
    
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const systemPrompt = `
      You are an expert UX Onboarding Engineer. Your goal is to create a multi-step product tour based on a user's goal and the available UI elements.
      
      User Goal: "${goal}"
      
      Available UI Elements:
      ${JSON.stringify(elements, null, 2)}
      
      Instructions:
      1. Analyze the UI elements and pick the most relevant ones to fulfill the goal.
      2. Create a tour with 3-5 steps.
      3. For each step, provide a clear, encouraging title and helpful content.
      4. Return ONLY a valid JSON object matching the following structure (no markdown, no backticks):
      {
        "id": "generated-tour",
        "steps": [
          {
            "id": "step-1",
            "title": "...",
            "content": "...",
            "target": "CSS_SELECTOR_FROM_ELEMENTS",
            "position": "top|bottom|left|right"
          }
        ]
      }
    `

    try {
      const result = await model.generateContent(systemPrompt)
      const response = await result.response
      const text = response.text().trim()
      
      // Remove markdown backticks if Gemini includes them
      const jsonString = text.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      
      return JSON.parse(jsonString) as GeneratedTour
    } catch (error: any) {
      console.error('AI Generation Error Detail:', error)
      throw new Error(`AI Generation failed: ${error.message || 'Unknown error'}`)
    }
  }
}
