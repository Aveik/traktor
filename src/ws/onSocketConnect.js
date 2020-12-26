const titles = [
  {
    id: 'pulpfiction',
    title: 'Pulp fiction',
  },
  {
    id: 'notebook',
    title: 'Notebook',
  },
  {
    id: 'lanoire',
    title: 'L.A Noire',
  },
];

const usersRoom = {};
const usersNickname = {};
// const rooms = {};
const roomsVoting = {};

// function createRoomBlueprint(titles) {
//   return {
//     state: 'lobby', // lobby | inProgress | finished
//     titles,
//   };
// }

function createRoomVotingBlueprint(titles) {
  const blueprint = {
    _votes: 0,
    titles: {},
  };
  titles.forEach(({ id }) => {
    blueprint.titles[id] = {
      agreedBy: [],
      disagreedBy: [],
    };
  });
  return blueprint;
}

function checkIfRoomHasMatch(room) {
  const usersInRoom = Object.values(usersRoom).filter((item) => item === room)
    .length;
  const match = Object.keys(roomsVoting[room].titles).find((titleId) => {
    if (
      usersInRoom === 2 &&
      roomsVoting[room].titles[titleId].agreedBy.length === 2
    ) {
      return roomsVoting[room].titles[titleId];
    }
    if (
      usersInRoom > 2 &&
      roomsVoting[room].titles[titleId].agreedBy.length > usersInRoom / 2
    ) {
      return roomsVoting[room].titles[titleId];
    }
  });
  if (match) {
    return match;
  }
  return roomsVoting[room]._votes === titles.length * usersInRoom;
}

function onSocketConnect(socket, io) {
  // socket.on('createRoom', ({ titles, uid }) => {
  //   rooms[uid] = createRoomBlueprint(titles);
  // });

  socket.on('join', ({ nickname, room }) => {
    console.log(`${nickname} joined room ${room}`);
    usersNickname[socket.id] = nickname;
    usersRoom[socket.id] = room;
    if (!roomsVoting[room]) {
      roomsVoting[room] = createRoomVotingBlueprint(titles);
    }
    socket.join(room);
    io.to(room).emit('usersInRoomChanged', Object.values(usersNickname));
  });

  socket.on('disconnect', () => {
    const [nickname, room] = [usersNickname[socket.id], usersRoom[socket.id]];
    console.log(`${nickname} left room ${room}`);
    delete usersNickname[socket.id];
    delete usersRoom[socket.id];
    io.to(room).emit('usersInRoomChanged', Object.values(usersNickname));
  });

  socket.on('agree', (movieId) => {
    const [nickname, room] = [usersNickname[socket.id], usersRoom[socket.id]];
    roomsVoting[room]._votes++;
    roomsVoting[room].titles[movieId].agreedBy.push(nickname);
    const match = checkIfRoomHasMatch(room);
    if (typeof match === 'boolean' && match) {
      io.to(room).emit('matchNotFound');
    } else if (typeof match === 'string') {
      io.to(room).emit('matchFound', match);
    }
  });

  socket.on('disagree', (movieId) => {
    const [nickname, room] = [usersNickname[socket.id], usersRoom[socket.id]];
    roomsVoting[room]._votes++;
    roomsVoting[room].titles[movieId].disagreedBy.push(nickname);
    const match = checkIfRoomHasMatch(room);
    if (typeof match === 'boolean' && match) {
      io.to(room).emit('matchNotFound');
    } else if (typeof match === 'string') {
      io.to(room).emit('matchFound', match);
    }
  });
}

module.exports = onSocketConnect;
