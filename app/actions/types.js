function defineActionTypes(types) {
  return types.reduce((types, typeName) => {
    types[typeName] = typeName
    return types
  }, {})
}

export default defineActionTypes([
  'GET_MOVIES_DISCOVER',
  'GET_MOVIES_DISCOVER_SUCCESS',
  'GET_MOVIES_DISCOVER_ERROR',

  'GET_MOVIE',
  'GET_MOVIE_SUCCESS',
  'GET_MOVIE_ERROR',

  'GET_MOVIE_RECOMMENDATION',
  'GET_MOVIE_RECOMMENDATION_SUCCESS',
  'GET_MOVIE_RECOMMENDATION_FAILURE',

  'GET_MOVIES_LIKED',
  'GET_MOVIES_LIKED_SUCCESS',
  'GET_MOVIES_LIKED_ERROR',

  'GET_MOVIES_SURVEY',
  'GET_MOVIES_SURVEY_SUCCESS',
  'GET_MOVIES_SURVEY_ERROR',

  'GET_MOVIES_DISLIKED',
  'GET_MOVIES_DISLIKED_SUCCESS',
  'GET_MOVIES_DISLIKED_ERROR',

  'LOGIN',
  'LOGIN_SUCCESS',
  'LOADING',
  'LOGOUT',

  'LIKE_MOVIE',
  'LIKE_MOVIE_SUCCESS',
  'LIKE_MOVIE_ERROR',

  'DISLIKE_MOVIE',
  'UNDISLIKE_MOVIE',
  'UNLIKE_MOVIE',

  'SKIP_MOVIE',
  'RESET_MOVIES',
])
