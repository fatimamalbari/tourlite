import { GoogleGenAI } from '@google/genai'

async function listModels() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) {
    console.error('No API Key found! Please set GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_API_KEY, or GOOGLE_API_KEY.')
    return
  }

  const ai = new GoogleGenAI({ apiKey })
  try {
    console.log('Fetching models...')
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'List the top three Gemini models available',
    })
    console.log('Success! Response text:', response.text)
  } catch (error: any) {
    console.log('--- Model Discovery Error ---')
    console.log(error.message)
  }
}

listModels()
