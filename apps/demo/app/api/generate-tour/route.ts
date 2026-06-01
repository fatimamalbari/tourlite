import { NextResponse } from 'next/server'
import { TourAIGenerator } from '@tour-ai/ai'

export async function POST(request: Request) {
  console.log('--- API Request Received: /api/generate-tour ---')
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  console.log('API Key present:', !!apiKey)

  if (!apiKey) {
    console.error('Missing API Key in Environment')
    return NextResponse.json(
      { error: 'AI API Key is not set in environment variables (GOOGLE_GENERATIVE_AI_API_KEY)' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { goal, elements } = body
    console.log('Goal:', goal)
    console.log('Elements Count:', elements?.length)

    const generator = new TourAIGenerator(apiKey)
    const tour = await generator.generateTour(goal, elements)
    console.log('Tour generated successfully')

    return NextResponse.json(tour)
  } catch (error: unknown) {
    console.error('Route Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate tour' },
      { status: 500 }
    )
  }
}
