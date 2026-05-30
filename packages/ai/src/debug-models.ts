import { GoogleGenerativeAI } from '@google/generative-ai'

async function listModels() {
  // Hardcoding key just for debug to bypass process.env issues
  const genAI = new GoogleGenerativeAI('YOUR_API_KEY_HERE')
  try {
    console.log('Fetching models...')
    // Use the official model listing method
    const models = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    console.log('Success!')
  } catch (error: any) {
    console.log('--- Model Discovery Error ---')
    console.log(error.message)
  }
}

listModels()
