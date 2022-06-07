const mongoose = require('mongoose')

const {
  MONGO_DB_URL
} = process.env

const startMongoDb = () => {
  mongoose
    .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
}
module.exports = startMongoDb
