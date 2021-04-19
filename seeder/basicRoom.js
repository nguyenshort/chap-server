require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const roomController = require('../controller/room.controller')
async function f() {
  const RoomController = new roomController()
  await RoomController.create('IT19A2B', [9973948931, 2275118151, 9721627322])
}

f()
