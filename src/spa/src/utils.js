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

export { getUserSlug };
