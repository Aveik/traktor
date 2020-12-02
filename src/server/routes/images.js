const router = require('express').Router();

const { redisClient, tmdb } = require('../clients');

// https://api.themoviedb.org/3/movie/<id>?api_key=
// https://api.themoviedb.org/3/person/<id>?api_key=
// https://api.themoviedb.org/3/tv/<id>?api_key=

// http://image.tmdb.org/t/p/ base URL
// poster w92, w154, w185, w342, w500, w780, original
// profile w45, w185, h632, original
// backdrop w300, w780, w1280, original

// entity = ['movie', 'show', 'person', 'season]
// type = ['poster', 'profile', 'backdrop']
router.use('/images/:id/:entity/:type', async function (req, res) {
  try {
    const { entity, id, type } = req.params;
    const { size = 'original' } = req.query;

    if (
      !['movie', 'person', 'season', 'show'].includes(entity) ||
      !['backdrop', 'poster', 'profile'].includes(type)
    ) {
      return res.redirect('https://via.placeholder.com/150');
    }

    // if redisClient.get(entity + id) - do not make a request
    // redisClient.setex(entity + id, 3600, JSON.stringify(response.data));
    const response = await tmdb.get(`/${entity}/${id}`);

    const { [type + '_path']: path } = response.data;

    if (!path) {
      return res.redirect('https://via.placeholder.com/150');
    }

    const URL = `http://image.tmdb.org/t/p/${size}/${path}`;
    return res.redirect(URL);
  } catch (err) {
    return res.redirect('https://via.placeholder.com/512');
  }
});

module.exports = router;
