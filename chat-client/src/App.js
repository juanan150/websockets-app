import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Messages from './components/Messages'
import MessageInput from './components/MessageInput'
import Button from './components/Button'

import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState(1)
  const [roomsJoined, setRoomsJoined] = useState([1])

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])
  return (
    <div className='App'>
      {socket && roomsJoined ? (
        <>
          <header className='app-header'>React Chat - Sala {room}</header>
          <Button
            onClick={() => setRoom(1)}
            room={1}
            currRoom={room}
            socket={socket}
            roomsJoined={roomsJoined}
            setRoomsJoined={setRoomsJoined}
          >
            Sala 1
          </Button>
          <Button
            onClick={() => setRoom(2)}
            room={2}
            currRoom={room}
            socket={socket}
            roomsJoined={roomsJoined}
            setRoomsJoined={setRoomsJoined}
          >
            Sala 2
          </Button>
          <div className='chat-container'>
            <Messages socket={socket} room={room} />
            <MessageInput socket={socket} room={room} />
          </div>
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  )
}

export default App
