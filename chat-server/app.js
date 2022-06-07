const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
var http = require('http')
const socketio = require('socket.io')
const socketController = require('./controllers/chat')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

const server = http.createServer(app)

const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => socketController(io, socket))

server.listen(3000)
