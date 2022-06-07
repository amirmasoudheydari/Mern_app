const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, requierd: false },
  id: String
})
module.exports = mongoose.model('users', UserSchema)
