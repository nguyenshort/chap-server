const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const UserSchema = new mongoose.Schema({
  room: {
    type: ObjectId,
    required: true,
    index: true
  },
  user: {
    type: ObjectId,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Messages', UserSchema)
