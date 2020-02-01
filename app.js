const express = require('express')
const config = require('config')
const mysql = require('mysql')

const app = express()
const PORT = config.get('port') || 5000

// to avoid CORS issues
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

// to be able to read response from express
app.use(express.json({ extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/products', require('./routes/products.routes'))

// create DB connection
const dbConnection = mysql.createConnection({
  host: config.get('dbhost'),
  user: config.get('dbuser'),
  password: config.get('dbpassword'),
  database: config.get('dbname')
})

async function start() {
  try {
    await dbConnection.connect()

    // open homepage like:
    // app.get('/', (request, response) => {
    //   console.log(`URL: ${request.url}`)
    //   response.send('Hello, Server!')
    // })

    // launch server on port 5000
    app.listen(PORT, () => console.log(`Express has been started on port ${PORT}`))
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()
