import dotenv from 'dotenv'
dotenv.config()

import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
const { v2: cloudinary } = require('cloudinary')

import connectDB from './config/be'
import user from './routes/user'
import animal from './routes/animal'
import animalType from './routes/animalType'
import productType from './routes/productType'
import storeCategory from './routes/storeCategory'
import product from './routes/product'
import blog from './routes/blog'
import card from './routes/card'
import blogCategory from './routes/blogCategory'
import logger from './middlewares/logger'
import error from './middlewares/error'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const storage = new CloudinaryStorage({ cloudinary })
const upload = multer({ storage })

const app = express()

const MONGO_URI = process.env.MONGO_URI || ''
const PORT = process.env.PORT || 4000

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'https://lucky-paws.vercel.app']

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())
app.use(logger)

app.use('/user', user)
app.use('/animal', animal)
app.use('/animalType', animalType)
app.use('/productType', productType)
app.use('/storeCategory', storeCategory)
app.use('/product', product)
app.use('/blog', blog)
app.use('/card', card)
app.use('/blogCategory', blogCategory)

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Lucky Paws API is running' })
})

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  res.status(200).json({ message: 'File uploaded successfully', file: req.file })
})

app.use(error)

connectDB(MONGO_URI)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
