async function listModels() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) {
    console.error('No API Key found! Please set GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_API_KEY, or GOOGLE_API_KEY.')
    return
  }

  try {
    console.log('Fetching available models...')
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    if (!response.ok) {
      throw new Error(`Model discovery request failed with status ${response.status}`)
    }
    const data = await response.json()

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
