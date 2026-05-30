import { GoogleGenerativeAI } from '@google/generative-ai'

async function listModels() {
  // Hardcoding key to avoid process.env issues
  const apiKey = 'YOUR_API_KEY_HERE' 
  
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
