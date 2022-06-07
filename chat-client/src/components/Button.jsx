import { useEffect, useState } from 'react'

import './Button.css'

const Button = ({
  children,
  onClick,
  socket,
  room,
  currRoom,
  roomsJoined,
  setRoomsJoined,
}) => {
  const [showAlert, setShowAlert] = useState(false)
  useEffect(() => {
    const messageListener = (message) => {
      if (message.room === room && currRoom !== room) {
        setShowAlert(true)
      }
    }

    currRoom === room && setShowAlert(false)

    socket.on('message', messageListener)
    return () => {
      socket.off('message', messageListener)
    }
  }, [socket, room, currRoom])

  const handleClick = () => {
    onClick()
    setRoomsJoined(rooms => [...rooms, room])
  }
  return (
    <div className='container'>
      <button className='button' onClick={handleClick}>
        {showAlert && <div className='alert'></div>}
        {children}
      </button>
      {roomsJoined.indexOf(room) === -1 ? <p>no unido</p> : <p>unido</p>}
    </div>
  )
}

export default Button
