const authController = require('../../controller/auth.controller')

module.exports = {
  Query: {
    me: (_, {}, { user }) => {
      return user
    }
  },
  Mutation: {
    signup: (_, { input: { email, name, password } }) => {
      const AuthController = new authController()
      return AuthController.signup(email, name, password)
    },
    signIn: (_, { input: { email, password } }) => {
      const AuthController = new authController()
      return AuthController.signin(email, password)
    }
  }
}
