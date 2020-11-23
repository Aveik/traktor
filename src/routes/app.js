const path = require('path');
const router = require('express').Router();

const { ensureLoggedIn } = require('../repositories/auth');

router.get(['/app', '/app/*'], ensureLoggedIn, function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../public/spa/index.html'));
});

module.exports = router;
