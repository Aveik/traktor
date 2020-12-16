import { capitalize } from '@material-ui/core';
import React from 'react';

const DEFAULTS = {
  COMMENT_PAGE_SIZE: 20,
  PAGE_SIZE: 36,
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

function extractFactsDefault(item) {
  if (!item) {
    return [];
  }
  const { ratings, stats, summary } = item;
  return [
    ['Rating', transformRatingToPercentage(ratings?.rating)],
    ['Votes', transformNumberToK(ratings?.votes)],
    ['Released', new Date(summary?.released).toLocaleDateString('da-Dk')],
    ['Genres', summary?.genres.map(capitalize).join(', ')],
    ['Certification', summary?.certification],
    ['Watchers', transformNumberToK(stats?.watchers)],
    ['Plays', transformNumberToK(stats?.plays)],
    ['Lists', transformNumberToK(stats?.lists)],
    ['Comments', transformNumberToK(stats?.comments)],
    ['Trailer', <a href={summary?.trailer}>Watch trailer</a>],
  ];
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

function transformEntityToPlural(entity) {
  switch (entity) {
    case 'movie':
      return 'movies';
    case 'show':
      return 'shows';
    case 'person':
      return 'people';
    default:
      return '';
  }
}

function transformNumberToK(num) {
  if (!num) {
    return '';
  }
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
}

function transformRatingToPercentage(rating) {
  if (!rating) {
    return '';
  }
  return `${(rating * 10).toFixed(2)}%`;
}

export {
  DEFAULTS,
  extractFactsDefault,
  getUserSlug,
  transformEntityToSingular,
  transformEntityToPlural,
  transformNumberToK,
  transformRatingToPercentage,
};
