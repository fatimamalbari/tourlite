import { GoogleGenAI } from '@google/genai'

async function checkKey() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) {
    console.error('No API Key found! Please set GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_API_KEY, or GOOGLE_API_KEY.')
    return
  }
  console.log('Testing new API Key...')
  
  try {
    const ai = new GoogleGenAI({ apiKey })
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'This is a key validation check.'
    })
    console.log('Success! Response text:', response.text)
  } catch (error: any) {
    console.error('API Error:', error.message)
    if (error.status) console.error('Status Code:', error.status)
  }
}

checkKey()
