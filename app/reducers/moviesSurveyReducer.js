export default (state = [], action) => {
  switch (action.type) {
    case 'GET_MOVIES_SURVEY_SUCCESS':
      return action.response.movies;

    case 'GET_MOVIES_SURVEY_ERROR':
      console.log('ERROR IN REDUCERS:', action.error);
      return state;

    case 'LIKE_MOVIE_SUCCESS':
    case 'LIKE_MOVIE_ERROR':
    default:
      return state;
  }
}