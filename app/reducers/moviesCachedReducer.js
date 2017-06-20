import { REHYDRATE } from 'redux-persist/constants';
import types from '../actions/types';
const { GET_MOVIE_SUCCESS } = types;

export default (state = {}, action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.moviesCached || {};
    case GET_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        [action.response.id]: action.response,
      });
    default:
      return state;
  }
};
