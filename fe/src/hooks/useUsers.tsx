import { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '@/utils/api'

export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    axios
      .get(`${API_URL}/user`)
      .then((res) => setUsers(res.data.users ?? []))
      .catch((err) => console.error('Error fetching users:', err))
  }, [])

  return { users }
}
