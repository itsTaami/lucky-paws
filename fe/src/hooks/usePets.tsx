import { useState, useEffect } from 'react'
import axios from 'axios'
import { IAnimal } from '../utils/interfaces/index'
import API_URL from '../utils/api'

export const useAnimals = () => {
  const [animals, setAnimal] = useState<IAnimal[]>([])

  const getAllAnimals = async () => {
    try {
      const result = await axios.get(`${API_URL}/animal`)
      setAnimal(result.data.animal)
    } catch (err) {
      console.error('Failed to fetch animals:', err)
    }
  }

  const addAnimal = async (newAnimal: any) => {
    try {
      const response = await axios.post(`${API_URL}/animal`, newAnimal)
      setAnimal(prev => [...prev, response.data.animal])
    } catch (error) {
      console.error('Error adding animal:', error)
    }
  }

  const updateAnimal = async ({ animalId, dataPass }: any) => {
    try {
      await axios.put(`${API_URL}/animal/${animalId}`, dataPass)
    } catch (error) {
      console.error('Error updating animal:', error)
    }
  }

  const deleteAnimal = async (animalId: string) => {
    try {
      await axios.delete(`${API_URL}/animal/${animalId}`)
    } catch (err) {
      console.error('Error deleting animal:', err)
    }
  }

  useEffect(() => {
    getAllAnimals()
  }, [])

  return { animals, setAnimal, addAnimal, updateAnimal, deleteAnimal }
}
