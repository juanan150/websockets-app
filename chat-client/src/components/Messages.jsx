import React, { useEffect, useState } from 'react'
import './Messages.css'

function Messages({ socket, room }) {
  const [messages, setMessages] = useState({})

  useEffect(() => {
    const messageListener = (message) => {
      if (message.room === room) {
        setMessages((prevMessages) => {
          const newMessages = { ...prevMessages }
          newMessages[message.id] = message
          return newMessages
        })
      }
    }

    const getMessagesListener = (messages) => setMessages(messages)

    socket.on('message', messageListener)
    socket.emit('getMessages', room)
    socket.on('getMessages', getMessagesListener)

    return () => {
      socket.off('message', messageListener)
    }
  }, [socket, room])

  return (
    <div className='message-list'>
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className='message-container'
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className='user'>{message.user.name}:</span>
            <span className='message'>{message.value}</span>
            <span className='date'>
              {new Date(message.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  )
}

export default Messages
