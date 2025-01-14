import { config } from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import router from './router/router.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

config()
connectDB()

app.use('/api',router)


const port = process.env.port

app.listen(port,()=>{
    console.log(`Server is running on http:localhost:${port}`)
})