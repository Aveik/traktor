const router = require('express').Router();

const { ensureLoggedIn } = require('../repositories/auth');

router.get('/debug/user', ensureLoggedIn, function (req, res) {
  res.json(req.user);
});

module.exports = router;
