import { combineReducers } from 'redux';
import movies from './moviesReducer'
import user from './userReducer'
import moviesSurvey from './moviesSurveyReducer'
import moviesLiked from './moviesLikedReducer'
import moviesDisliked from './moviesDislikedReducer'
import movieRecomm from './movieRecommReducer'
import moviesSkipped from './moviesSkippedReducer'

export default combineReducers({
  movies, user, moviesSurvey, moviesLiked, moviesDisliked, movieRecomm, moviesSkipped
})
