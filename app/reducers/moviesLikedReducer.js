import { REHYDRATE } from 'redux-persist/constants';
import types from '../actions/types';
const {
  GET_MOVIES_LIKED_SUCCESS,
  UNLIKE_MOVIE_REQUEST,
  LIKE_MOVIE_REQUEST,
} = types;

export default (state = [], { type, payload, movieId, response }) => {
  switch (type) {
    case REHYDRATE:
      return payload.moviesLiked || [];

    case LIKE_MOVIE_REQUEST:
      return [movieId, ...state];

    case UNLIKE_MOVIE_REQUEST:
      return state.filter(id => id != movieId);

    case GET_MOVIES_LIKED_SUCCESS:
      return response.movies;

    default:
      return state;
  }
};
