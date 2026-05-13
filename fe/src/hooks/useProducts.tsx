import { useState, useEffect } from 'react'
import axios from 'axios'
import { IProduct } from '../utils/interfaces/index'
import API_URL from '../utils/api'

export const useProducts = () => {
  const [products, setProduct] = useState<IProduct[]>([])

  const getAllProducts = async () => {
    try {
      const result = await axios.get(`${API_URL}/product`)
      setProduct(result.data.product)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return { products, setProduct }
}
