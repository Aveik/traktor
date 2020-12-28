import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import Tile from '../../../components/tiles/Tile/Tile.component';
import { createNotification } from '../../../redux/notifications/notifications.slice';
import { transformEntityToPlural } from '../../../utils';
import ActionBar from './ActionBar/ActionBar.component';
import Board from './Board/Board.component';
import Intro from './Intro/Intro.component';

const items = [
  {
    show: {
      ids: {
        slug: 'game-of-thrones',
        tmdb: 1399,
      },
    },
    type: 'show',
  },
  {
    movie: {
      ids: {
        slug: 'tenet-2020',
        tmdb: 577922,
      },
    },
    type: 'movie',
  },
];

function LetsPick() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    // owner created room
    socket.on('roomCreated', setRoom);

    // owner started room
    socket.on('roomStarted', setRoom);

    // 1. owner left the room
    // 2. any user left the room when it was already started
    socket.on('roomDisbanded', (message) => {
      dispatch(createNotification(message));
      setRoom(null);
    });

    socket.on('matchFound', (item) => {
      dispatch(
        createNotification(
          `Match found! Let's watch ${item[item.type].ids.slug}`,
        ),
      );
      setRoom(null);
    });

    socket.on('matchNotFound', () => {
      dispatch(createNotification(`No match found :-( Try again!`));
      setRoom(null);
    });

    // confirmation of user successfully leaving the room (not owner)
    socket.on('roomLeft', () => setRoom(null));

    // user joined alert
    socket.on('userJoined', setRoom);

    // user left alert
    socket.on('userLeft', setRoom);

    socket.on('error', (error) => dispatch(createNotification(error)));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  function handleCreateRoom() {
    socket.emit('createRoom', items);
  }

  function handleJoinRoom(key) {
    socket.emit('joinRoom', key);
  }

  function handleLeaveRoom() {
    socket.emit('leaveRoom', room.key);
  }

  function handleStartRoom() {
    socket.emit('startRoom', room.key);
  }

  function handleAgree(itemSlug) {
    socket.emit('agree', { itemSlug, roomKey: room.key });
  }

  function handleDisagree(itemSlug) {
    socket.emit('disagree', { itemSlug, roomKey: room.key });
  }

  return (
    <MuiBox height='100vh' position='relative'>
      {!room && <Intro onCreate={handleCreateRoom} onJoin={handleJoinRoom} />}
      {room && (
        <MuiBox height='calc(100% - 80px)'>
          <Board
            onAgree={handleAgree}
            onDisagree={handleDisagree}
            room={room}
          />
          <ActionBar
            onLeave={handleLeaveRoom}
            onStart={handleStartRoom}
            room={room}
          />
        </MuiBox>
      )}
    </MuiBox>
  );
}

export default LetsPick;
