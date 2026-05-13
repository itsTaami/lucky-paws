import type { NextApiRequest, NextApiResponse } from 'next'
import Groq from 'groq-sdk'

export type MatchAnswers = {
  lifestyle: 'active' | 'moderate' | 'relaxed'
  home: 'house' | 'apartment' | 'condo'
  experience: 'first-time' | 'experienced'
  hoursHome: 'less-than-4' | '4-to-8' | 'more-than-8'
  petType: 'dog' | 'cat' | 'any'
  size: 'small' | 'medium' | 'large' | 'any'
  hasKids: 'yes' | 'no'
  hasOtherPets: 'yes' | 'no'
}

export type MatchResult = {
  recommendation: string
  bestPetType: string
  idealTraits: string[]
  encouragement: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatchResult | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key not configured' })
  }

  const answers: MatchAnswers = req.body

  const prompt = `You are a professional pet adoption counselor at Lucky Paws, a pet adoption platform.

A potential adopter has answered the following questionnaire:
- Lifestyle: ${answers.lifestyle}
- Home type: ${answers.home}
- Pet ownership experience: ${answers.experience}
- Hours spent at home per day: ${answers.hoursHome.replace(/-/g, ' ')}
- Preferred pet type: ${answers.petType}
- Preferred size: ${answers.size}
- Has children at home: ${answers.hasKids}
- Has other pets: ${answers.hasOtherPets}

Based on this profile, respond ONLY with a valid JSON object (no markdown, no extra text) in this exact format:
{
  "recommendation": "A warm, 2-3 sentence personalized paragraph explaining which type of pet suits them best and why",
  "bestPetType": "One of: Dog, Cat, Rabbit, Bird, or Fish",
  "idealTraits": ["trait1", "trait2", "trait3", "trait4"],
  "encouragement": "One uplifting sentence to encourage them to adopt"
}`

  try {
    const groq = new Groq({ apiKey })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 500,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = completion.choices[0]?.message?.content ?? ''
    const result: MatchResult = JSON.parse(content)
    res.status(200).json(result)
  } catch (err) {
    console.error('pet-match error:', err)
    res.status(500).json({ error: 'Failed to generate recommendation' })
  }
}
