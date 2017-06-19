import { REHYDRATE } from 'redux-persist/constants'
import types from '../actions/types'
const {
  GET_MOVIES_LIKED_SUCCESS,
  GET_MOVIES_LIKED_ERROR,
  UNLIKE_MOVIE_REQUEST,
  LIKE_MOVIE_REQUEST,
} = types

export default (state = [], action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.moviesLiked || []

    case LIKE_MOVIE_REQUEST:
      return [action.movieId, ...state]

    case UNLIKE_MOVIE_REQUEST:
      return state.filter(id => id != action.movieId)

    case GET_MOVIES_LIKED_SUCCESS:
      return action.response.movies

    case GET_MOVIES_LIKED_ERROR:
    default:
      return state
  }
}
