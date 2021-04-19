const messController = require('../../controller/mess.controller')

module.exports = {
  Query: {},
  Mutation: {
    addMessages: (_, { input: { roomID, content, image } }, { user }) => {
      return new messController().create(user, roomID, content, image)
    }
  }
}
