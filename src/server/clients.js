const axios = require('axios').default;
const redis = require('redis');

const db = require('knex')({
  client: 'mysql',
  connection: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
});

const redisClient = redis.createClient();

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
