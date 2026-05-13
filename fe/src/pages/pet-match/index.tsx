import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { useAnimals } from '@/hooks/usePets'
import type { MatchAnswers, MatchResult } from '../api/pet-match'

const steps = [
  {
    key: 'lifestyle' as const,
    question: "How would you describe your lifestyle?",
    options: [
      { value: 'active', label: 'Very Active', emoji: '🏃', desc: 'Daily exercise, outdoors a lot' },
      { value: 'moderate', label: 'Moderate', emoji: '🚶', desc: 'Some activity, balanced routine' },
      { value: 'relaxed', label: 'Relaxed', emoji: '🛋️', desc: 'Prefer quiet, homebody life' },
    ],
  },
  {
    key: 'home' as const,
    question: "What type of home do you live in?",
    options: [
      { value: 'house', label: 'House', emoji: '🏠', desc: 'With a yard or outdoor space' },
      { value: 'apartment', label: 'Apartment', emoji: '🏢', desc: 'No private outdoor space' },
      { value: 'condo', label: 'Condo / Townhouse', emoji: '🏘️', desc: 'Limited outdoor access' },
    ],
  },
  {
    key: 'experience' as const,
    question: "Have you owned a pet before?",
    options: [
      { value: 'first-time', label: 'First-time owner', emoji: '🌱', desc: 'New to pet ownership' },
      { value: 'experienced', label: 'Experienced', emoji: '⭐', desc: 'Have owned pets before' },
    ],
  },
  {
    key: 'hoursHome' as const,
    question: "How many hours are you home per day?",
    options: [
      { value: 'less-than-4', label: 'Less than 4 hours', emoji: '⏰', desc: 'Busy schedule, often out' },
      { value: '4-to-8', label: '4 to 8 hours', emoji: '🕐', desc: 'Regular working hours' },
      { value: 'more-than-8', label: 'More than 8 hours', emoji: '🏡', desc: 'Work from home or stay home' },
    ],
  },
  {
    key: 'petType' as const,
    question: "Do you have a preferred type of pet?",
    options: [
      { value: 'dog', label: 'Dog', emoji: '🐶', desc: 'Loyal, playful companion' },
      { value: 'cat', label: 'Cat', emoji: '🐱', desc: 'Independent, low-maintenance' },
      { value: 'any', label: 'Open to any', emoji: '🐾', desc: 'Surprise me!' },
    ],
  },
  {
    key: 'size' as const,
    question: "What size of pet do you prefer?",
    options: [
      { value: 'small', label: 'Small', emoji: '🐹', desc: 'Easy to handle, less space' },
      { value: 'medium', label: 'Medium', emoji: '🐕', desc: 'Great balance of size' },
      { value: 'large', label: 'Large', emoji: '🦮', desc: 'Big buddy, needs space' },
      { value: 'any', label: 'No preference', emoji: '✨', desc: 'Any size works' },
    ],
  },
  {
    key: 'hasKids' as const,
    question: "Do you have children at home?",
    options: [
      { value: 'yes', label: 'Yes', emoji: '👶', desc: 'Kids live in the home' },
      { value: 'no', label: 'No', emoji: '🧑', desc: 'No children at home' },
    ],
  },
  {
    key: 'hasOtherPets' as const,
    question: "Do you already have other pets?",
    options: [
      { value: 'yes', label: 'Yes', emoji: '🐾', desc: 'Other animals in the home' },
      { value: 'no', label: 'No', emoji: '🏠', desc: 'No other pets' },
    ],
  },
]

const fadeSlide = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
}

export default function PetMatchPage() {
  const { animals } = useAnimals()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<MatchAnswers>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<MatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const breadCrumbs = [{ name: 'Find My Pet', link: '' }]
  const step = steps[currentStep]
  const progress = ((currentStep) / steps.length) * 100

  function selectOption(value: string) {
    const updated = { ...answers, [step.key]: value }
    setAnswers(updated)

    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(s => s + 1), 200)
    } else {
      submitAnswers(updated as MatchAnswers)
    }
  }

  async function submitAnswers(finalAnswers: MatchAnswers) {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.post<MatchResult>('/api/pet-match', finalAnswers)
      setResult(data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function restart() {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
    setError(null)
  }

  const suggestedAnimals = animals.filter((a: any) => {
    if (!result) return false
    const type = result.bestPetType.toLowerCase()
    return a.type?.toLowerCase().includes(type) || a.name?.toLowerCase().includes(type)
  }).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#FFF3D3]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumbs breadCrumbs={breadCrumbs} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Find My Perfect Pet</h1>
          <p className="mt-2 text-gray-500">Answer a few questions and our AI will match you with your ideal companion</p>
        </div>

        {/* Questionnaire */}
        {!result && !loading && (
          <>
            {/* Progress bar */}
            <div className="w-full bg-orange-100 rounded-full h-2 mb-8">
              <motion.div
                className="bg-orange-400 h-2 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-gray-400 text-right mb-4">
              Question {currentStep + 1} of {steps.length}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={fadeSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-3xl shadow-[0_8px_16px_rgba(132,74,20,0.15)] p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {step.question}
                </h2>
                <div className={`grid gap-4 ${step.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
                  {step.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => selectOption(opt.value)}
                      className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-orange-100 hover:border-orange-400 hover:bg-orange-50 transition-all group"
                    >
                      <span className="text-4xl group-hover:scale-110 transition-transform">{opt.emoji}</span>
                      <span className="font-semibold text-gray-800">{opt.label}</span>
                      <span className="text-xs text-gray-400 text-center">{opt.desc}</span>
                    </button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(s => s - 1)}
                    className="mt-6 text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-[0_8px_16px_rgba(132,74,20,0.15)] p-12 text-center"
          >
            <div className="text-6xl mb-4 animate-bounce">🐾</div>
            <p className="text-xl font-semibold text-gray-700">Finding your perfect match…</p>
            <p className="text-gray-400 mt-2">Our AI is analyzing your profile</p>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-white rounded-3xl p-8 text-center shadow-[0_8px_16px_rgba(132,74,20,0.15)]">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={restart} className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors">
              Try Again
            </button>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Main recommendation card */}
            <div className="bg-white rounded-3xl shadow-[0_8px_16px_rgba(132,74,20,0.15)] p-8 mb-6">
              <div className="text-center mb-6">
                <span className="text-6xl">
                  {result.bestPetType === 'Dog' ? '🐶' : result.bestPetType === 'Cat' ? '🐱' : result.bestPetType === 'Rabbit' ? '🐰' : result.bestPetType === 'Bird' ? '🐦' : '🐠'}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mt-3">
                  Your Perfect Match: <span className="text-orange-500">{result.bestPetType}</span>
                </h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed text-center mb-6">
                {result.recommendation}
              </p>

              <div className="bg-orange-50 rounded-2xl p-5 mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Look for these traits:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.idealTraits.map((trait, i) => (
                    <span key={i} className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-center text-orange-500 font-semibold italic">
                "{result.encouragement}"
              </p>
            </div>

            {/* Matched pets from the database */}
            {suggestedAnimals.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Pets waiting for you 🐾
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {suggestedAnimals.map((animal: any) => (
                    <Link key={animal._id} href={`/animal/${animal._id}`}>
                      <div className="bg-white rounded-3xl shadow-[0_8px_16px_rgba(132,74,20,0.15)] overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                        <Image
                          src={animal.imgs[0]?.src}
                          alt={animal.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-3 text-center">
                          <p className="font-bold text-gray-800">{animal.name}</p>
                          <p className="text-sm text-gray-400">{animal.gender} · {animal.size}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Link href="/animal">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors">
                  Browse All Pets
                </button>
              </Link>
              <button
                onClick={restart}
                className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold px-8 py-3 rounded-full transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
