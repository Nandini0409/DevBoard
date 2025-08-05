const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  console.log('Received a request at /')
  res.send('Hello, World!')
})

app.listen(PORT, ()=>{
  console.log('Server is running on http://localhost:3000')
})
