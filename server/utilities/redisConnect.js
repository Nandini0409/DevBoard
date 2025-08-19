const { createClient } = require('redis')

const redisConnect = async () => {
  const client = createClient({
  url: 'redis://127.0.0.1:6379'  
})
  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()
  return client
}

module.exports = { redisConnect }