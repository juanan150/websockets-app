import React, { useState } from 'react';
import './MessageInput.css';

const NewMessage = ({socket, room}) => {
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('room-message', value, room);
    setValue('');
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
};

export default NewMessage;