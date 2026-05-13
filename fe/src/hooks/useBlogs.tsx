import { useState, useEffect } from 'react'
import axios from 'axios'
import { IBlog } from '@/utils/interfaces'
import API_URL from '@/utils/api'

export const useBlogs = () => {
  const [blogs, setBlog] = useState<IBlog[]>([])

  const getAllBlogs = async () => {
    try {
      const result = await axios.get(`${API_URL}/blog`)
      setBlog(result.data.blog)
    } catch (err) {
      console.error('Failed to fetch blogs:', err)
    }
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  return { blogs }
}
