import { REHYDRATE } from 'redux-persist/constants';
import types from '~/actions/types';
const { GET_MOVIE_SUCCESS } = types;

export default (state = {}, { type, response, payload }) => {
  switch (type) {
    case REHYDRATE:
      return payload.moviesCached || {};

    case GET_MOVIE_SUCCESS:
      return { ...state, [response.id]: response };

    default:
      return state;
  }
};
