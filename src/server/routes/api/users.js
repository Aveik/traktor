const createError = require('http-errors');
const router = require('express').Router();

const { ensureLoggedIn } = require('../../repositories/auth');
const { getUserBySlug } = require('../../repositories/users');
const {
  follow,
  getFollowers,
  getFollowing,
  unfollow,
} = require('../../repositories/userFollowers');

router.get('/users/:slug', ensureLoggedIn, async function (req, res, next) {
  try {
    const { slug } = req.params;
    const data = await getUserBySlug(slug);
    res.status(data ? 204 : 404).send();
  } catch (error) {
    next(createError());
  }
});

router.get(
  '/users/:uuid/followers',
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const { uuid } = req.params;
      const data = await getFollowers(uuid);
      res.json(data);
    } catch (error) {
      next(createError(error));
    }
  },
);

router.get(
  '/users/:uuid/following',
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const { uuid } = req.params;
      const data = await getFollowing(uuid);
      res.json(data);
    } catch (error) {
      next(createError(error));
    }
  },
);

router.delete(
  '/users/:uuid/unfollow',
  ensureLoggedIn,
  async function (req, res, next) {
    const { uuid } = req.params;
    try {
      await unfollow({ followerUuid: req.user.uuid, userUuid: uuid });
      res.status(204).send();
    } catch (error) {
      next(createError(error));
    }
  },
);

router.post(
  '/users/:uuid/follow',
  ensureLoggedIn,
  async function (req, res, next) {
    const { uuid } = req.params;
    try {
      await follow({ followerUuid: req.user.uuid, userUuid: uuid });
      res.status(204).send();
    } catch (error) {
      next(createError(error));
    }
  },
);

module.exports = router;
