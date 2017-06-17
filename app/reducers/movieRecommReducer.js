import types from '../actions/types'
const {
  GET_MOVIE_RECOMMENDATION_SUCCESS,
  GET_MOVIE_RECOMMENDATION_FAILURE,
} = types

export default (state = { movieId: undefined }, action) => {
  switch (action.type) {
    case GET_MOVIE_RECOMMENDATION_SUCCESS:
      return { movieId: action.response.movieId }

    case GET_MOVIE_RECOMMENDATION_FAILURE:
      console.log('ERROR IN REDUCERS:', action.error)
      return state

    default:
      return state
  }
}
