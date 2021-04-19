const roomController = require('../../controller/room.controller')

module.exports = {
  Query: {
    stickyRoom: () => {
      return new roomController().stickyRoom()
    },
    room: async (_, { input: { id } }, { user }) => {
      return new roomController().myRoom(id, user)
    }
  },
  Mutation: {}
}
