export const SpotifySymbol = 'apiSpotifySymbol'
export const TMDBSymbol = 'apiTMDBSymbol'
import types from './types'
const {
  GET_MOVIES_DISCOVER,
  GET_MOVIE,
  GET_MOVIE_RECOMMENDATION,
  GET_MOVIES_SURVEY,
  GET_MOVIES_LIKED,
  GET_MOVIES_DISLIKED,
  DISLIKE_MOVIE,
  SKIP_MOVIE,
  LIKE_MOVIE,
  UNLIKE_MOVIE,
  UNDISLIKE_MOVIE,
  RESET_MOVIES,
  LOADING,
  LOGOUT,
  LOGIN,
} = types

export const getMoviesDiscover = () => ({
  type: GET_MOVIES_DISCOVER,
  [TMDBSymbol]: {
    endpoint: '/discover/movie',
    method: 'GET',
  },
})

export const getMovieFromId = movieId => ({
  type: GET_MOVIE,
  [TMDBSymbol]: {
    endpoint: `/movie/${movieId}`,
    method: 'GET',
  },
})

export const getMovieRecommendation = () => ({
  type: GET_MOVIE_RECOMMENDATION,
  [SpotifySymbol]: {
    endpoint: `/movies/recommendation`,
    method: 'GET',
  },
})

export const getMoviesSurvey = () => ({
  type: GET_MOVIES_SURVEY,
  [SpotifySymbol]: {
    endpoint: `/movies/survey`,
    method: 'GET',
  },
})

export const getMoviesLiked = () => ({
  type: GET_MOVIES_LIKED,
  [SpotifySymbol]: {
    endpoint: `/movies/liked`,
    method: 'GET',
  },
})

export const getMoviesDisliked = () => ({
  type: GET_MOVIES_DISLIKED,
  [SpotifySymbol]: {
    endpoint: `/movies/disliked`,
    method: 'GET',
  },
})

export const dislikeMovie = movieId => ({
  type: DISLIKE_MOVIE,
  [SpotifySymbol]: {
    endpoint: `/movies/${movieId}/dislike`,
    method: 'POST',
  },
})

export const skipMovie = movieId => ({
  type: SKIP_MOVIE,
})

export const likeMovie = movieId => ({
  type: LIKE_MOVIE,
  [SpotifySymbol]: {
    endpoint: `/movies/${movieId}/like`,
    method: 'POST',
  },
})

export const unLikeMovie = movieId => ({
  type: UNLIKE_MOVIE,
  [SpotifySymbol]: {
    endpoint: `/movies/${movieId}/unlike`,
    method: 'POST',
  },
  success: getMoviesLiked,
})

export const unDislikeMovie = movieId => ({
  type: UNDISLIKE_MOVIE,
  [SpotifySymbol]: {
    endpoint: `/movies/${movieId}/undislike`,
    method: 'POST',
  },
  success: getMoviesDisliked,
})

export const resetMovies = () => ({
  type: RESET_MOVIES,
})

export const loading = () => ({
  type: LOADING,
})

export const logout = () => ({
  type: LOGOUT,
})

export const login = code => ({
  type: LOGIN,
  [SpotifySymbol]: {
    endpoint: '/login',
    method: 'POST',
    data: {
      code: code,
    },
  },
})
