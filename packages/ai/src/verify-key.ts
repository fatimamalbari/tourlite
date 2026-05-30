import { GoogleGenerativeAI } from '@google/generative-ai'

async function checkKey() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    console.error('No API Key found! Please set GOOGLE_GENERATIVE_AI_API_KEY environment variable.')
    return
  }
  console.log('Testing new API Key...')
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    const data = await response.json()
    
    if (data.models) {
      console.log('Success! Supported Models:')
      data.models.forEach((m: any) => console.log(`- ${m.name}`))
      
      const hasFlash = data.models.some((m: any) => m.name.includes('gemini-1.5-flash'))
      if (hasFlash) {
        console.log('✅ gemini-1.5-flash is supported!')
      } else {
        console.log('❌ gemini-1.5-flash is NOT in the list.')
      }
    } else {
      console.log('Error:', data)
    }
  } catch (error: any) {
    console.error('Fetch Error:', error.message)
  }
}

checkKey()
