import { useState, useEffect } from 'react'
import axios from 'axios'
import { IAnimal } from '@/utils/interfaces'
import API_URL from '@/utils/api'

export const useFavAnimal = () => {
  const [addAnimal, setAddAnimal] = useState<IAnimal[]>([])

  const addAnimalToFav = async () => {
    try {
      const result = await axios.post(`${API_URL}/favAnimal`)
      setAddAnimal(result.data.favAnimal)
    } catch (err) {
      console.error('Error adding to favourites:', err)
    }
  }

  const removeFavAnimal = async () => {
    try {
      const result = await axios.delete(`${API_URL}/favAnimal`)
      setAddAnimal(result.data.favAnimal)
    } catch (err) {
      console.error('Error removing favourite:', err)
    }
  }

  useEffect(() => {
    addAnimalToFav()
  }, [])

  return { addAnimal, addAnimalToFav, removeFavAnimal }
}
