module.exports = [
  require('./app'),
  require('./auth'),
  require('./trakt'),
  ...(process.env.NODE_ENV === 'development' ? [require('./debug')] : []),
];
