const { db, trakt } = require('../clients');

async function createOrUpdateUser({ refreshToken, slug, uuid }) {
  const user = await findUserByUuid({ uuid });
  if (user) {
    return updateUser({ refreshToken, slug, uuid });
  }
  await createUser({ refreshToken, slug, uuid });
  return {
    refreshToken,
    uuid,
  };
}

async function createUser({ refreshToken, slug, uuid }) {
  return db('users').insert({
    refreshToken,
    slug,
    uuid,
  });
}

async function findUserByUuid({ uuid }) {
  return db('users').where({ uuid }).first();
}

async function getUserDetails({ accessToken }) {
  const response = await trakt.get('/users/settings', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.user.ids;
}

async function updateUser({ refreshToken, slug, uuid }) {
  await db('users').where({ uuid }).update({ refreshToken, slug });
}

module.exports = {
  createOrUpdateUser,
  createUser,
  findUserByUuid,
  getUserDetails,
  updateUser,
};
