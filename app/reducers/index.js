import { combineReducers } from 'redux'
import movies from './moviesReducer'
import user from './userReducer'
import moviesSurvey from './moviesSurveyReducer'
import moviesLiked from './moviesLikedReducer'
import moviesDisliked from './moviesDislikedReducer'
import movieRecomm from './movieRecommReducer'
import moviesCached from './moviesCachedReducer'
import likedListScreen from './likedListScreenReducer'
import types from '../actions/types'
const { LOGOUT } = types

const reducers = combineReducers({
  movies,
  user,
  moviesSurvey,
  moviesLiked,
  moviesDisliked,
  movieRecomm,
  moviesCached,
  likedListScreen,
})

export default (state, action) => {
  if (action.type === LOGOUT) {
    state = {}
  }

  return reducers(state, action)
}
