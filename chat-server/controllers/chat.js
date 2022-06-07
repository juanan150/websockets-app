const uuidv4 = require('uuid').v4

const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
}

const messages = new Set()
const users = new Map()

function socketController(io, socket) {
  console.log(socket.id)
  console.log(socket.rooms)
  socket.on('message', (value) => {
    const message = {
      id: uuidv4(),
      user: users.get(socket) || defaultUser,
      value,
      time: Date.now(),
    }
    saveMessage(message)
    io.sockets.emit('message', message)
  })

  socket.on('room-message', (value, room) => {
    const message = {
      id: uuidv4(),
      user: users.get(socket) || defaultUser,
      value,
      room,
      time: Date.now(),
    }
    saveMessage(message)
    io.to(room).emit('message', message)
  })

  socket.on('getMessages', (room) => {
    socket.join(room)
    // room === 1 ? socket.leave(2) : socket.leave(1)
    const roomMessages = [...messages].filter(message => message.room === room)
    socket.emit('getMessages', roomMessages)
  })
}

function saveMessage(message) {
  messages.add(message)
}

module.exports = socketController
