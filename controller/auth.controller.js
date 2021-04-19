const { ApolloError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')

class UserController {
  createToken(user, expiresIn) {
    const { id, email } = user
    return jwt.sign({ id, email }, process.env.SECRET, { expiresIn })
  }
  readToken(_token) {
    try {
      return jwt.verify(_token, process.env.SECRET)
    } catch (e) {
      return null
    }
  }
  async getUser(_token) {
    const check = this.readToken(_token, process.env.SECRET)
    if (check) {
      const user = await User.findOne({ id: check.id })
      user.password = ''
      return user
    } else {
      return null
    }
  }
  async signin(email, password) {
    const user = await User.findOne({ email })
    if (!user) {
      throw new ApolloError('Thành viên không tồn tại', 'HAS_MESS')
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new ApolloError('Mật khẩu không đúng', 'HAS_MESS')
    }
    return {
      token: this.createToken(user, '365d')
    }
  }

  async signup(email, name, password) {
    if (!new RegExp('^[\\w-\\/.]+@([\\w-]+\\.)+[\\w-]{2,4}$').test(email)) {
      throw new ApolloError('Email không hợp lệ', 'HAS_MESS')
    }
    if (password.length < 6) {
      throw new ApolloError('Mật khẩu quá ngắn', 'HAS_MESS')
    }
    const user = await User.findOne({ email })
    if (user) {
      throw new ApolloError('Thành viên đã tồn tại', 'HAS_MESS')
    }
    const newUser = await new User({
      id: Math.floor(Math.random() * 8999999999) + 1000000000,
      email,
      password,
      name
    }).save()
    return {
      token: this.createToken(newUser, '365d')
    }
  }
}
module.exports = UserController
