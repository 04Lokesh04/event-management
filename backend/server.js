import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './db/db.js'
import eventRoutes from './routes/eventRoutes.js'
import profileRoutes from './routes/profileRoutes.js'

dotenv.config()
const app=express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://event-management-liart-five.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json())

app.use('/api/profile', profileRoutes)
app.use('/api/event', eventRoutes)

const port= process.env.PORT || 5000
connectDB()
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
