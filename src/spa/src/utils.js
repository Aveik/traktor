const DEFAULTS = {
  COMMENT_PAGE_SIZE: 20,
  PAGE_SIZE: 40,
};

function parseCookie() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
  }, {});
}

function getUserSlug() {
  return process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_MOCKED_USER_SLUG
    : parseCookie().userSlug;
}

function transformEntityToSingular(entity) {
  switch (entity) {
    case 'movies':
      return 'movie';
    case 'shows':
      return 'show';
    case 'people':
      return 'person';
    // in case of search
    default:
      return 'movie,show,person';
  }
}

export { DEFAULTS, getUserSlug, transformEntityToSingular };
