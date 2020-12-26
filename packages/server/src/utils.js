const { promisify } = require('util');
const { redisClient } = require('./clients');

const get = promisify(redisClient.get).bind(redisClient);
const set = promisify(redisClient.setex).bind(redisClient);

module.exports = {
  redis: {
    get,
    set,
  },
};
