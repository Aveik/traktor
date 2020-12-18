const createError = require('http-errors');
const httpProxy = require('http-proxy');
const router = require('express').Router();

const proxy = httpProxy.createProxyServer();

//@TODO: figure out why we need this to forward body of post, put, update http methods
proxy.on('proxyReq', (proxyReq, req) => {
  if (req.body) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
});

//@TODO: implement refresh action in case access token expired.
router.use('/trakt', function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next(createError(401));
  }
  proxy.web(
    req,
    res,
    {
      changeOrigin: true,
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
        'trakt-api-key': process.env.TRAKT_TV_CLIENT_ID,
      },
      secure: false,
      target: 'https://api.trakt.tv',
    },
    next,
  );
});

module.exports = router;
