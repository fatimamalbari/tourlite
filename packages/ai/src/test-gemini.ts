import { GoogleGenAI } from '@google/genai'

async function testConnection() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) {
    console.error('No API Key found! Please set GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_API_KEY, or GOOGLE_API_KEY.')
    return
  }
  const ai = new GoogleGenAI({ apiKey })

  try {
    console.log('Testing connection with gemini-2.5-flash...')
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Hi, say hello!'
    })
    console.log('Success! AI Response:', response.text)
  } catch (error: any) {
    console.error('API Error:', error.message)
    if (error.status) console.error('Status Code:', error.status)
  }
}

testConnection()
