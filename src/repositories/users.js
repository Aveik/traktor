const { db, trakt } = require('../clients');

async function createOrUpdateUser({ refreshToken, uuid }) {
  const user = await findUserByUuid({ uuid });
  if (user) {
    return updateUser({ refreshToken, uuid });
  }
  await createUser({ refreshToken, uuid });
  return {
    refreshToken,
    uuid,
  };
}

async function createUser({ refreshToken, uuid }) {
  return db('users').insert({
    refreshToken,
    uuid,
  });
}

async function findUserByUuid({ uuid }) {
  return db('users').where({ uuid }).first();
}

async function getUserUuid({ accessToken }) {
  const response = await trakt.get('/users/settings', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.user.ids.uuid;
}

async function updateUser({ refreshToken, uuid }) {
  await db('users').where({ uuid }).update({ refreshToken });
}

module.exports = {
  createOrUpdateUser,
  createUser,
  findUserByUuid,
  getUserUuid,
  updateUser,
};
