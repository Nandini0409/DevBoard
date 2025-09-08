const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const connectDB = require('./Database/dbConnection')
const session = require('express-session')

const cookieParser = require('cookie-parser')


const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const artworkRoutes = require('./routes/artworkRoutes')
const imageRoutes = require('./routes/imageRoutes')


app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
}))

connectDB()

app.use('/auth', authRoutes)  
app.use('/users', profileRoutes)
app.use('/artworks', artworkRoutes)
app.use('/image', imageRoutes)

app.use((err, req, res, next) => {
  console.error(err)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})
