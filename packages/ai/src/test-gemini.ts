import { GoogleGenerativeAI } from '@google/generative-ai'

async function testConnection() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    console.error('No API Key found! Please set GOOGLE_GENERATIVE_AI_API_KEY environment variable.')
    return
  }
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  try {
    console.log('Testing connection with gemini-1.5-flash...')
    const result = await model.generateContent('Hi, say hello!')
    console.log('Success! AI Response:', result.response.text())
  } catch (error: any) {
    console.error('API Error:', error.message)
    if (error.status) console.error('Status Code:', error.status)
  }
}

testConnection()
