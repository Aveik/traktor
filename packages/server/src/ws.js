const { Server } = require('socket.io');

const { session } = require('./clients');
const { getUserByUuid } = require('./repositories/users');

const roomInstances = {};

class Room {
  constructor() {
    this.state = 'lobby';
    this.items = [];
    this.owner = {
      id: null,
      slug: null,
    };
    this.users = {};
    this.votes = 0;
  }

  setOwner(socket, user) {
    this.owner = {
      id: socket.id,
      slug: user.slug,
    };
    return this;
  }

  setItems(items) {
    this.items = items.map((item) => ({
      ...item,
      agreedBy: [],
      disagreedBy: [],
    }));
    return this;
  }

  addUser(socket, user) {
    this.users[user.slug] = socket.id;
    return this;
  }

  removeUser(user) {
    delete this.users[user.slug];
    return this;
  }

  start() {
    this.state = 'started';
    return this;
  }

  disband(roomKey) {
    delete roomInstances[roomKey];
  }

  save(roomKey) {
    roomInstances[roomKey] = this;
    return this;
  }

  static get(roomKey) {
    return roomInstances[roomKey] || null;
  }
}

const ERRORS = {
  INVALID_VOTE_ACTION: 'INVALID_VOTE_ACTION',
  NOT_ENOUGH_USERS_IN_ROOM: 'NOT_ENOUGH_USERS_IN_ROOM',
  ROOM_ALREADY_EXISTS: 'ROOM_ALREADY_EXISTS',
  ROOM_ALREADY_STARTED: 'ROOM_ALREADY_STARTED',
  ROOM_DOES_NOT_EXIST: 'ROOM_DOES_NOT_EXIST',
  ROOM_NOT_STARTED: 'ROOM_NOT_STARTED',
  USER_ALREADY_IN_ROOM: 'USER_ALREADY_IN_ROOM',
  USER_NOT_IN_ROOM: 'USER_NOT_IN_ROOM',
  USER_NOT_PERMITTED: 'USER_NOT_PERMITTED',
};

const MESSAGES = {
  ROOM_DISBANDED_MATCH_FOUND: 'ROOM_DISBANDED_MATCH_FOUND',
  ROOM_DISBANDED_NO_MATCH_FOUND: 'ROOM_DISBANDED_NO_MATCH_FOUND',
  ROOM_DISBANDED_OWNER_LEFT: 'ROOM_DISBANDED_OWNER_LEFT',
  ROOM_DISBANDED_USER_LEFT: 'ROOM_DISBANDED_USER_LEFT',
};

async function handleConnect(socket) {
  try {
    const { uuid } = socket.request.session?.passport.user;
    return getUserByUuid(uuid, true);
  } catch (err) {
    // not authenticated
    socket.disconnect();
  }
}

function handleCreateRoom({ items, socket, user }) {
  const canCreate = socket.rooms.size === 1;

  // user already in other room, user has to leave to create his own
  if (!canCreate) {
    socket.emit('error', ERRORS.USER_ALREADY_IN_ROOM);
    return;
  }

  const roomKey = `ws-room-${user.slug}`;
  let room = Room.get(roomKey);

  // room already exists
  if (room) {
    socket.emit('error', ERRORS.ROOM_ALREADY_EXISTS);
    return;
  }

  const instance = new Room()
    .setItems(items)
    .setOwner(socket, user)
    .addUser(socket, user)
    .save(roomKey);
  socket.join(roomKey);
  socket.emit('roomCreated', instance);
}

function handleJoinRoom({ io, roomKey, socket, user }) {
  const canJoin = socket.rooms.size === 1;

  // user already in other room, can't join two
  if (!canJoin) {
    socket.emit('error', ERRORS.USER_ALREADY_IN_ROOM);
    return;
  }

  const room = Room.get(roomKey);
  if (!room) {
    socket.emit('error', ERRORS.ROOM_DOES_NOT_EXIST);
    return;
  }

  if (room.state === 'started') {
    socket.emit('error', ERRORS.ROOM_ALREADY_STARTED);
    return;
  }

  room.addUser(socket, user).save(roomKey);
  socket.join(roomKey);
  io.to(roomKey).emit('userJoined', room);
}

function handleLeaveRoom({ io, roomKey, socket, user }) {
  const room = Room.get(roomKey);

  if (!room) {
    socket.emit('error', ERRORS.ROOM_DOES_NOT_EXIST);
    return;
  }

  const isInRoom = room.users[user.slug];
  // user was never in the room, emit error
  if (!isInRoom) {
    socket.emit('error', ERRORS.USER_NOT_IN_ROOM);
    return;
  }

  // owner is leaving, disband room and disconnect sockets from room
  if (room.owner.slug === user.slug) {
    io.to(roomKey).emit('roomDisbanded', MESSAGES.ROOM_DISBANDED_OWNER_LEFT);
    Object.values(room.users).forEach((socketId) =>
      io.of('/').sockets.get(socketId)?.leave(roomKey),
    );
    room.disband(roomKey);
    return;
  }

  // room is started and someone left, disband room and disconnect sockets from room
  if (room.state === 'started') {
    io.to(roomKey).emit('roomDisbanded', MESSAGES.ROOM_DISBANDED_USER_LEFT);
    Object.values(room.users).forEach((socketId) =>
      io.of('/').sockets.get(socketId)?.leave(roomKey),
    );
    room.disband(roomKey);
    return;
  }

  room.removeUser(user);
  socket.leave(roomKey);
  io.to(roomKey).emit('userLeft', room);
}

function handleDisconnect({ io, socket, user }) {
  const roomKeys = Array.from(socket.rooms).filter((roomKey) =>
    roomKey.startsWith('ws-room-'),
  );
  roomKeys.forEach((roomKey) => handleLeaveRoom({ io, roomKey, socket, user }));
}

function handleStartRoom({ io, roomKey, socket, user }) {
  const room = Room.get(roomKey);

  if (!room) {
    socket.emit('error', ERRORS.ROOM_DOES_NOT_EXIST);
    return;
  }

  if (room.owner.slug !== user.slug) {
    socket.emit('error', ERRORS.USER_NOT_PERMITTED);
    return;
  }

  if (room.state === 'started') {
    socket.emit('error', ERRORS.ROOM_ALREADY_STARTED);
    return;
  }

  if (Object.keys(room.users).length <= 1) {
    socket.emit('error', ERRORS.NOT_ENOUGH_USERS_IN_ROOM);
    return;
  }

  room.start().save(roomKey);
  io.to(roomKey).emit('roomStarted', room);
}

function handleVote({ io, itemSlug, roomKey, socket, type, user }) {
  const room = Room.get(roomKey);

  if (!room) {
    socket.emit('error', ERRORS.ROOM_DOES_NOT_EXIST);
    return;
  }

  const isInRoom = room.users[user.slug];
  // user was never in the room, emit error
  if (!isInRoom) {
    socket.emit('error', ERRORS.USER_NOT_IN_ROOM);
    return;
  }

  if (room.state !== 'started') {
    socket.emit('error', ERRORS.ROOM_NOT_STARTED);
    return;
  }

  const item = room.items.find((item) => item.ids.slug === itemSlug);
  // item user wants to vote for does not exist
  if (!item) {
    socket.emit('error', ERRORS.INVALID_VOTE_ACTION);
    return;
  }

  const target = type === 'agree' ? item.agreedBy : item.disagreedBy;
  // user already voted for this action, can't vote repeatedly
  if (target.includes(user.slug)) {
    socket.emit('error', ERRORS.INVALID_VOTE_ACTION);
    return;
  }

  target.push(user.slug);
  room.votes += 1;

  const usersCount = Object.keys(room.users).length;
  const match = room.items.find((item) => {
    if (usersCount === 2 && item.agreedBy.length === 2) {
      return item;
    }
    if (item.agreedBy.length > usersCount / 2) {
      return item;
    }
  });

  if (match) {
    io.to(roomKey).emit('roomDisbanded', MESSAGES.ROOM_DISBANDED_MATCH_FOUND);
    Object.values(room.users).forEach((socketId) =>
      io.of('/').sockets.get(socketId)?.leave(roomKey),
    );
    room.disband(roomKey);
    return;
  }

  // everyone voted, no match
  if (room.votes === room.items.length * usersCount) {
    io.to(roomKey).emit(
      'roomDisbanded',
      MESSAGES.ROOM_DISBANDED_NO_MATCH_FOUND,
    );
    Object.values(room.users).forEach((socketId) =>
      io.of('/').sockets.get(socketId)?.leave(roomKey),
    );
    room.disband(roomKey);
  }
}

function setupWsServer(server) {
  const io = new Server(server, { cors: { origin: 'http://localhost:8000' } });

  io.use((socket, next) => {
    session(socket.request, {}, next);
  });

  io.on('connection', async (socket) => {
    const user = await handleConnect(socket);

    socket.on('createRoom', (items) =>
      handleCreateRoom({ items, socket, user }),
    );

    socket.on('joinRoom', (roomKey) =>
      handleJoinRoom({ io, roomKey, socket, user }),
    );

    socket.on('leaveRoom', (roomKey) =>
      handleLeaveRoom({ io, roomKey, socket, user }),
    );

    socket.on('startRoom', (roomKey) =>
      handleStartRoom({ io, roomKey, socket, user }),
    );

    socket.on('agree', ({ itemSlug, roomKey }) =>
      handleVote({ io, itemSlug, roomKey, socket, type: 'agree', user }),
    );

    socket.on('disagree', ({ itemSlug, roomKey }) =>
      handleVote({ io, itemSlug, roomKey, socket, type: 'disagree', user }),
    );

    socket.on('disconnecting', () => handleDisconnect({ io, socket, user }));
  });
}

module.exports = setupWsServer;
