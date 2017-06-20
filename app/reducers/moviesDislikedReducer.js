import { REHYDRATE } from 'redux-persist/constants';
import types from '~/actions/types';
const {
  GET_MOVIES_DISLIKED_SUCCESS,
  UNDISLIKE_MOVIE_REQUEST,
  DISLIKE_MOVIE_REQUEST,
} = types;

export default (state = [], { type, payload, movieId, response }) => {
  switch (type) {
    case REHYDRATE:
      return payload.moviesDisliked || [];

    case DISLIKE_MOVIE_REQUEST:
      return [movieId, ...state];

    case UNDISLIKE_MOVIE_REQUEST:
      return state.filter(id => id != movieId);

    case GET_MOVIES_DISLIKED_SUCCESS:
      return response.movies;

    default:
      return state;
  }
};
