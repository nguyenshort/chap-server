const User = require('../models/User')

class UserController {
  constructor() {}

  async get(type, value) {
    return User.findOne({ [type]: value })
  }
}
module.exports = UserController
