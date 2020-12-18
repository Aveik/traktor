const { db } = require('../clients');

async function getFollowers(uuid) {
  return db('userFollowers')
    .where({ userUuid: uuid })
    .innerJoin('users', 'userFollowers.followerId', 'users.uuid')
    .select('users.uuid', 'users.slug');
}

async function getFollowing(uuid) {
  return db('userFollowers')
    .where({ followerUuid: uuid })
    .innerJoin('users', 'userFollowers.userId', 'users.uuid')
    .select('users.uuid', 'users.slug');
}

async function getRecord({ followerUuid, userUuid }) {
  return db('userFollowers')
    .where({
      followerUuid,
      userUuid,
    })
    .first();
}

async function unfollow({ followerUuid, userUuid }) {
  const result = await getRecord({ followerUuid, userUuid });
  if (result) {
    await db('userFollowers').delete({
      followerUuid,
      userUuid,
    });
  }
}

async function follow({ followerUuid, userUuid }) {
  const result = await getRecord({ followerUuid, userUuid });
  if (!result) {
    await db('userFollowers').insert({
      followerUuid,
      userUuid,
    });
  }
}

module.exports = {
  follow,
  getFollowers,
  getFollowing,
  getRecord,
  unfollow,
};
