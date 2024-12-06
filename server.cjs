const express = require('express')
const cors= require('cors')

const app = express()

app.use(cors())

app.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  return res.json({
    userId,
    name: 'John',
    email: 'john@gmail.com'
  })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  setTimeout(() => {
    const results = Array.from({length:10}, (v, i) => `${i+1}-${keyword}`) 
    res.json(results)
  }, 600) 
})

app.listen(3300, () => console.log('server is running on port 3300'))