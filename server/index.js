const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const { githubLogin } = require('./routes/githubLogin')
const { privateDashboard } = require('./routes/privateDashboard')
const connectDB = require('./Database/dbConnection')
const session = require('express-session')

app.use(cors())
app.use(express.json())
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
}))

connectDB()

app.get('/', (req, res) => {
  console.log('Received a request at /')
  res.send('Hello, World!')
})

app.get('/githubLogin', (req, res) => { githubLogin(req, res) })
app.get('/privateDashboard', (req, res) => { privateDashboard(req, res) })

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})
