const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    default: null
  },
  users: {
    type: [ObjectId],
    default: [],
    index: true
  },
  avatar: {
    type: String,
    default: 'https://i.imgur.com/pqGLgGr.jpg'
  },
  sticky: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Room', UserSchema)
