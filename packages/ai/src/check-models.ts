import { GoogleGenerativeAI } from '@google/generative-ai'

async function listModels() {
  // Use the API key from environment
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    console.error('No API Key found! Please set GOOGLE_GENERATIVE_AI_API_KEY environment variable.')
    return
  }
  
  try {
    console.log('Fetching available models...')
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    const data = await response.json();
        
    if (data.models) {
      console.log('Supported Models:')
      data.models.forEach((m: any) => console.log(`- ${m.name}`))
    } else {
      console.log('No models returned:', data)
    }
  } catch (error: any) {
    console.log('--- Discovery Error ---')
    console.log(error.message)
  }
}

listModels()
