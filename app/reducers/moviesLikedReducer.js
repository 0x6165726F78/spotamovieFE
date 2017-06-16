export default (state = [], action) => {
  switch (action.type) {
    case 'GET_MOVIES_LIKED_SUCCESS':
      return action.response.movies;

    case 'GET_MOVIES_LIKED_ERROR':
    default:
      return state;
  }
}