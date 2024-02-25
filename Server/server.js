const express = require('express')

const dotenv = require('dotenv')
const result = dotenv.config()
const initRouter = require('./routes')

//Connect DB mongo
const dbConnect = require('./config/dbConnect')

const app = express()

const port = process.env.PORT || 8888

//config json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect()

initRouter(app)

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
