import { useState, useEffect } from 'react'
import axios from 'axios'
import { ICard } from '@/utils/interfaces'
import API_URL from '@/utils/api'

export const useCard = () => {
  const [card, setCard] = useState<ICard[]>([])

  const createCard = async () => {
    try {
      const result = await axios.post(`${API_URL}/product`)
      setCard(result.data.card)
    } catch (err) {
      console.error('Error creating card:', err)
    }
  }

  useEffect(() => {
    createCard()
  }, [])

  return { card, createCard }
}
