const { promisify } = require('util');
const router = require('express').Router();

const { redisClient, tmdb } = require('../clients');

const setCache = promisify(redisClient.setex).bind(redisClient);
const getCache = promisify(redisClient.get).bind(redisClient);

/**
 * Related TMDB Endpoints
 * https://api.themoviedb.org/3/movie/<id>?api_key=
 * https://api.themoviedb.org/3/person/<id>?api_key=
 * https://api.themoviedb.org/3/tv/<id>?api_key=
 * https://api.themoviedb.org/3/tv/<id>/seasons?api_key=
 *
 * Base image URL: http(s)://image.tmdb.org/t/p/{size}/{path}
 *
 * Available types: ['backdrop', 'poster', 'profile']
 *
 * Available sizes for type:
 * Backdrop: ['w300', 'w780', 'w1280', 'original']
 * Poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
 * Profile: ['w45', 'w185', 'w632', 'original']
 */
router.use('/images/:entity/:id/:type', async function (req, res) {
  try {
    const { entity, id, type } = req.params;
    const { season, size = 'original' } = req.query;

    if (
      !['movie', 'person', 'show'].includes(entity) ||
      !['backdrop', 'poster', 'profile'].includes(type)
    ) {
      return res.redirect('https://via.placeholder.com/150');
    }

    if (
      (entity === 'person' && type !== 'profile') ||
      (entity === 'show' && type === 'profile') ||
      (entity === 'show' && season && type !== 'poster') ||
      (entity === 'movie' && type === 'profile')
    ) {
      return res.redirect('https://via.placeholder.com/150');
    }

    if (size !== 'original') {
      // prettier-ignore
      if (
        type === 'backdrop' && !['w300', 'w780', 'w1280'].includes(size) ||
        type === 'poster' && !['w92', 'w154', 'w185', 'w342', 'w500', 'w780'].includes(size) ||
        type === 'profile' && !['w45', 'w185', 'w632'].includes(size)
      ) {
        return res.redirect('https://via.placeholder.com/150');
      }
    }

    let requestURL = `/${entity}/${id}`;
    let cacheKey = `${entity}_${id}`;
    if (entity === 'show') {
      requestURL = `/tv/${id}`;
      if (season) {
        cacheKey += `_${season}`;
        requestURL += `/season/${season}`;
      }
    }

    const cache = await getCache(cacheKey);
    if (cache) {
      return res.redirect(`http://image.tmdb.org/t/p/${size}${cache}`);
    }

    const response = await tmdb.get(requestURL);
    const { [type + '_path']: path } = response.data;

    if (!path) {
      return res.redirect('https://via.placeholder.com/150');
    }

    await setCache(cacheKey, 3600, path);
    return res.redirect(`http://image.tmdb.org/t/p/${size}${path}`);
  } catch (err) {
    return res.redirect('https://via.placeholder.com/512');
  }
});

module.exports = router;
