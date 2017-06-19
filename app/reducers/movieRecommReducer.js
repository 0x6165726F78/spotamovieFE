import types from '../actions/types'
const {
  GET_MOVIE_RECOMMENDATION_SUCCESS,
  GET_MOVIE_RECOMMENDATION_FAILURE,
} = types

export default (state = [], action) => {
  switch (action.type) {
    case GET_MOVIE_RECOMMENDATION_SUCCESS:
      return action.response.movies
    default:
      return state
  }
}
