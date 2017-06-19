import { REHYDRATE } from 'redux-persist/constants'
import types from '../actions/types'
const {
  GET_MOVIES_DISLIKED_SUCCESS,
  GET_MOVIES_DISLIKED_ERROR,
  UNDISLIKE_MOVIE_REQUEST,
  DISLIKE_MOVIE_REQUEST,
} = types

export default (state = [], action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.moviesDisliked || []

    case DISLIKE_MOVIE_REQUEST:
      return [action.movieId, ...state]

    case UNDISLIKE_MOVIE_REQUEST:
      return state.filter(id => id != action.movieId)

    case GET_MOVIES_DISLIKED_SUCCESS:
      return action.response.movies

    case GET_MOVIES_DISLIKED_ERROR:
    default:
      return state
  }
}
