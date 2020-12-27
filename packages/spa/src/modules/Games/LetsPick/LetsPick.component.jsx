import {
  Button as MuiButton,
  TextField as MuiTextField,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { getUserSlug } from '../../../utils';

function LetsPick() {
  const [socket, setSocket] = useState(null);
  const [roomKey, setRoomKey] = useState('');
  const [users, setUsers] = useState(null);

  const reset = useCallback(() => {
    setRoomKey('');
    setUsers(null);
  }, []);

  function handleCreateRoom() {
    setRoomKey(`ws-room-${getUserSlug()}`);
    socket.emit('createRoom');
  }

  function handleJoinRoom() {
    socket.emit('joinRoom', roomKey);
  }

  function handleLeaveRoom() {
    console.log('left room');
    socket.emit('leaveRoom', roomKey);
    reset();
  }

  function handleRoomKeyChange({ target: { value } }) {
    setRoomKey(value);
  }

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    socket.on('roomCreated', (roomKey) => {
      console.log('Room created', roomKey);
      socket.emit('joinRoom', roomKey);
    });

    socket.on('roomDisbanded', () => {
      console.log('Room disbanded');
      reset();
    });

    socket.on('userJoined', (users) => {
      console.log('User joined', users);
      setUsers(users);
    });

    socket.on('userLeft', (users) => {
      console.log('User left', users);
      setUsers(users);
    });

    socket.on('error', console.log);

    return () => {
      socket.close();
    };
  }, [reset]);

  return (
    <>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h1>Create room</h1>
      <MuiButton
        color='secondary'
        onClick={handleCreateRoom}
        variant='contained'
      >
        Create room
      </MuiButton>
      <h1>Join room</h1>
      <MuiTextField
        onChange={handleRoomKeyChange}
        size='small'
        value={roomKey}
        variant='outlined'
      />
      <MuiButton color='secondary' onClick={handleJoinRoom} variant='contained'>
        Join room
      </MuiButton>
      <h1>Leave room</h1>
      <MuiButton
        color='secondary'
        onClick={handleLeaveRoom}
        variant='contained'
      >
        Leave room
      </MuiButton>
    </>
  );
}

export default LetsPick;
