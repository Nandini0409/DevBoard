const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const connectDB = require('./Database/dbConnection')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const googleLogin = require('./routes/googleLogin')
const privateDashboard = require('./routes/privateDashboard')
const emailSignup = require('./routes/emailSignup')
const callback = require('./routes/callback')
const refresh = require('./routes/refresh')
const emailLogin = require('./routes/emailLogin')

const profile = require('./routes/profile')

app.use(cors(
  {
    origin: process.env.HOST_URL,
    credentials: true,
    accessControlAllowOrigin: true,
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

app.get('/', (req, res) => {
  console.log('Received a request at /')
  res.send('Hello, World!')
})

app.get('/googleLogin', (req, res) => { googleLogin(req, res) })
app.get('/privateDashboard', (req, res) => { privateDashboard(req, res) })
app.post('/emailSignup', (req, res) => { emailSignup(req, res) })
app.post('/emailLogin', (req, res) => { emailLogin(req, res) })
app.get('/callback', (req, res) => { callback(req, res) })
app.get('/refresh', (req, res) => { refresh(req, res) })

app.get('/api/profile', (req, res)=>{profile(req, res)})

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})
