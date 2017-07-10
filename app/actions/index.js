import { SpotifySymbol, TMDBSymbol } from '../lib/apiMiddleware.js';
import types from './types';
const {
  GET_MOVIE,
  GET_MOVIES_RECOMMENDATION,
  GET_MOVIES_SURVEY,
  GET_MOVIES_LIKED,
  GET_MOVIES_DISLIKED,
  DISLIKE_MOVIE,
  LIKE_MOVIE,
  UNLIKE_MOVIE,
  UNDISLIKE_MOVIE,
  RESET_MOVIES,
  LOADING,
  LOGOUT,
  LOGIN,
  ON_VALUE_CHANGE,
} = types;

export const getMovieFromId = (movieId, list = false) => ({
  type: GET_MOVIE,
  [TMDBSymbol]: {
    endpoint: `/movie/${movieId}`,
    method: 'GET',
  },
  list,
});

export const getMoviesRecommendation = () => ({
  type: GET_MOVIES_RECOMMENDATION,
  [SpotifySymbol]: {
    endpoint: `/movies/recommendation`,
    method: 'GET',
  },
});

export const getMoviesSurvey = () => ({
  type: GET_MOVIES_SURVEY,
  [SpotifySymbol]: {
    endpoint: `/movies/survey`,
    method: 'GET',
  },
});

export const getMoviesLiked = () => ({
  type: GET_MOVIES_LIKED,
  [SpotifySymbol]: {
    endpoint: `/movies/liked`,
    method: 'GET',
  },
});

export const getMoviesDisliked = () => ({
  type: GET_MOVIES_DISLIKED,
  [SpotifySymbol]: {
    endpoint: `/movies/disliked`,
    method: 'GET',
  },
});

export const dislikeMovie = movieId => ({
  type: DISLIKE_MOVIE,
  [SpotifySymbol]: {
    endpoint: `/movies/${movieId}/dislike`,
    method: 'POST',
  },
  movieId,
});

export const likeMovie = movieId => ({
  type: LIKE_MOVIE,
  [SpotifySymbol]: {
    endpoint: `/movies/${movieId}/like`,
    method: 'POST',
  },
  movieId,
});

export const unLikeMovie = movieId => ({
  type: UNLIKE_MOVIE,
  [SpotifySymbol]: {
    endpoint: `/movies/${movieId}/unlike`,
    method: 'POST',
  },
  movieId,
});

export const unDislikeMovie = movieId => ({
  type: UNDISLIKE_MOVIE,
  [SpotifySymbol]: {
    endpoint: `/movies/${movieId}/undislike`,
    method: 'POST',
  },
  movieId,
});

export const resetMovies = () => ({
  type: RESET_MOVIES,
});

export const loading = () => ({
  type: LOADING,
});

export const logout = () => ({
  type: LOGOUT,
});

export const login = code => ({
  type: LOGIN,
  [SpotifySymbol]: {
    endpoint: '/login',
    method: 'POST',
    data: {
      code: code,
    },
  },
});

export const onValueChange = value => ({
  type: ON_VALUE_CHANGE,
  value,
});
