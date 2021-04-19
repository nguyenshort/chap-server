const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  about: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: 'user'
  },
  avatar: {
    type: String,
    default: 'https://i.imgur.com/pqGLgGr.jpg'
  }
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})
module.exports = mongoose.model('User', UserSchema)
