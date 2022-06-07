const mongoose = require('mongoose')

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  likes: {
    type: [String],
    default: []
  }
})
const TourModal = mongoose.model('Tour', tourSchema)
module.exports = TourModal
