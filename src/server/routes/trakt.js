const createError = require('http-errors');
const httpProxy = require('http-proxy');
const router = require('express').Router();

const proxy = httpProxy.createProxyServer();

//@TODO: implement refresh action in case access token expired.
//@TODO: implement custom json payload factory
router.use('/trakt', function (req, res) {
  if (!req.isAuthenticated()) {
    return res.json(createError(401));
  }
  proxy.web(req, res, {
    changeOrigin: true,
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
      'trakt-api-key': process.env.TRAKT_TV_CLIENT_ID,
    },
    secure: false,
    target: 'https://api.trakt.tv',
  });
});

module.exports = router;
