const {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express')

const roomController = require('../controller/room.controller')
const Messages = require('../models/Messages')

class MessController {
  constructor() {}

  async create(user, roomID, content, image) {
    if (!user) {
      throw new AuthenticationError('Bạn cần đăng nhập để sử dụng')
    }
    const RoomController = new roomController()
    const room = await RoomController.room(roomID)
    if (!room) {
      throw new ForbiddenError('Phòng không tồn tại')
    }
    if (!RoomController.inRoom(room, user)) {
      throw new AuthenticationError('Bạn không có mặt tại phòng này')
    }
    const messages = new Messages({
      room: room._id,
      user: user._id,
      content,
      image,
      createdAt: Date.now()
    })
    await messages.save()
    return Object.assign({}, messages.toObject(), { user }, { room })
  }
}

module.exports = MessController
