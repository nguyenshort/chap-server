const {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express')

const userController = require('../controller/user.controller')
const Room = require('../models/Room')

class RoomController {
  constructor() {}

  async room(id) {
    return Room.findOne({ id })
  }

  inRoom(room, user) {
    return room.sticky || room.users.includes(user._id)
  }

  async create(name, users) {
    if (!name) {
      throw new ApolloError('Tên không thể để trống', 'HAS_MESS')
    }
    if (!users.length) {
      throw new ApolloError('Thành viên không được để trống', 'HAS_MESS')
    }
    const UserController = new userController()
    const mems = []
    await Promise.all(
      Object.values(users).map(async (value) => {
        const user = await UserController.get('id', value)
        user && mems.push(user._id)
      })
    )
    if (!mems.length) {
      throw new ApolloError('Thành viên không được để trống', 'HAS_MESS')
    }
    const room = new Room({
      id: Math.floor(Math.random() * 10000000) + 10000000,
      name,
      users: mems,
      createdAt: Date.now()
    })
    return room.save()
  }

  async stickyRoom() {
    return Room.find({ sticky: true })
  }

  async myRoom(id, user) {
    if (!user) {
      throw new AuthenticationError('Bạn cần đăng nhập')
    }
    const room = await this.room(id)
    if (!room) {
      throw new ForbiddenError('Phòng không tồn tại')
    }
    if (this.inRoom(room, user)) {
      return room
    } else {
      throw new AuthenticationError('Bạn không có quyền truy cập')
    }
  }
}

module.exports = RoomController
