import { useState } from 'react'
import axios from 'axios'
import { IBlog } from '@/utils/interfaces'
import API_URL from '@/utils/api'

export const useAddBlogs = () => {
  const [newBlog, setNewBlog] = useState<IBlog>({
    title: '',
    imgList: [],
    description: '',
    publishedBy: '',
  })

  const createBlog = async (blog: any, clearFields: () => void) => {
    try {
      await axios.post(`${API_URL}/blog`, blog)
      setNewBlog({ title: '', imgList: [], description: '', publishedBy: '' })
      clearFields()
    } catch (err) {
      console.error('Error creating blog:', err)
    }
  }

  return { newBlog, createBlog, setNewBlog }
}
