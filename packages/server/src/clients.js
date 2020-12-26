const axios = require('axios').default;
const redis = require('redis');

const db = require('knex')({
  client: 'mysql',
  connection: process.env.DATABASE_URL,
});

const redisClient = redis.createClient(process.env.REDIS_URL);

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

const trakt = axios.create({
  baseURL: 'https://api.trakt.tv/',
  headers: {
    'trakt-api-key': process.env.TRAKT_TV_CLIENT_ID,
  },
});

module.exports = {
  db,
  redisClient,
  tmdb,
  trakt,
};
