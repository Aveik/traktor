const { Server } = require('socket.io');

const { session } = require('./clients');
const { getUserByUuid } = require('./repositories/users');
const {
  redis: { get, set },
} = require('./utils');

class Room {
  constructor(room) {
    this.items = room?.items || [];
    this.owner = room?.owner || {
      id: null,
      slug: null,
    };
    this.users = room?.users || {};
  }

  setOwner(socket, user) {
    this.owner = {
      id: socket.id,
      slug: user.slug,
    };
    return this;
  }

  addUser(socket, user) {
    this.users[user.slug] = socket.id;
    return this;
  }

  static async get(roomKey) {
    const result = await get(roomKey);
    return result ? new Room(JSON.parse(result)) : null;
  }

  async save(roomKey) {
    await set(roomKey, 600, JSON.stringify(this));
  }
}

async function handleConnect(socket) {
  try {
    const { uuid } = socket.request.session?.passport.user;
    return getUserByUuid(uuid, true);
  } catch (err) {
    // not authenticated
    socket.disconnect();
  }
}

async function handleCreateRoom(socket, user) {
  const roomKey = `ws-room-${user.slug}`;
  const room = await Room.get(roomKey);
  if (!room) {
    await new Room().setOwner(socket, user).addUser(socket, user).save(roomKey);
    socket.join(roomKey);
    return;
  }
  if (room.owner.slug === user.slug) {
    socket.join(roomKey);
  }
}

async function handleJoinRoom(socket, user, roomKey) {
  const room = await Room.get(roomKey);
  if (room) {
    await room.addUser(socket, user).save(roomKey);
    socket.join(roomKey);
  }
}

function setupWsServer(server) {
  const io = new Server(server, { cors: { origin: 'http://localhost:8000' } });

  io.use((socket, next) => {
    session(socket.request, {}, next);
  });

  io.on('connection', async (socket) => {
    const user = await handleConnect(socket);

    socket.on('createRoom', async () => await handleCreateRoom(socket, user));

    socket.on(
      'joinRoom',
      async (roomKey) => await handleJoinRoom(socket, user, roomKey),
    );

    socket.on('dev', async () => {
      console.log(await Room.get('ws-room-marovargovcik'));
    });
  });
}

module.exports = setupWsServer;
