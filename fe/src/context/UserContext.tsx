import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'
import API_URL from '@/utils/api'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }: any) => {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState('')

  const success = () =>
    toast.success('Signed in successfully!', {
      position: 'top-center', autoClose: 3000, theme: 'dark',
    })

  const errorAlert = () =>
    toast.error('Something went wrong. Please try again.', {
      position: 'top-center', autoClose: 3000, theme: 'dark',
    })

  const warningAlert = () =>
    toast.warn('Please fill in all fields.', {
      position: 'top-center', autoClose: 3000, theme: 'dark',
    })

  const Resuccess = () =>
    toast.success('Account created! Please sign in.', {
      position: 'top-center', autoClose: 3000, theme: 'dark',
    })

  const ReerrorAlert = () =>
    toast.error('Please fill in all required fields.', {
      position: 'top-center', autoClose: 3000, theme: 'dark',
    })

  const RewarningAlert = () =>
    toast.warn('Passwords do not match.', {
      position: 'top-center', autoClose: 3000, theme: 'dark',
    })

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/user/signin`, { email, password })
      const data = result.data

      localStorage.setItem('token', String(data.token))
      localStorage.setItem('user', String(data.user.email))
      localStorage.setItem('name', String(data.user.name))
      localStorage.setItem('profile', String(data.user.profileImg))
      localStorage.setItem('userId', String(data.user._id))

      if (String(data.status) === 'ok') {
        success()
        setState('success')
        setUser(data.user)
        setTimeout(() => router.push('/'), 3000)
      } else if (!data.token) {
        localStorage.removeItem('token')
      }
    } catch (error) {
      setState('error')
      errorAlert()
    }
  }

  const handleLogin = async () => {
    if (!email || !password) {
      warningAlert()
      setState('warning')
      return
    }
    login(email, password)
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/user/signup`, { name, email, password })
      Resuccess()
      setTimeout(() => router.push('/auth'), 5000)
    } catch (error) {
      ReerrorAlert()
    }
  }

  const handleRegister = async () => {
    if (!email || !name || !password) {
      ReerrorAlert()
      return
    }
    if (password !== rePassword) {
      RewarningAlert()
      return
    }
    signup(name, email, password)
  }

  return (
    <UserContext.Provider
      value={{
        email, setEmail,
        password, setPassword,
        handleLogin,
        name, setName,
        rePassword, setRePassword,
        handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
