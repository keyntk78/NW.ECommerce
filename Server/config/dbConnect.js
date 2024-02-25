const { default: mongoose } = require('mongoose')

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn.connection.readyState === 1)
      console.log('Connected to MongoDB successfully')
    else console.log('Connected to MongoDB failed')
  } catch (error) {
    console.log('Db connection failed: ', error)
  }
}

module.exports = dbConnect
