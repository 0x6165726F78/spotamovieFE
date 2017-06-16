export default (state = [], action) => {
  switch (action.type) {
    case 'GET_MOVIES_DISLIKED_SUCCESS':
      return action.response.movies;

    case 'GET_MOVIES_DISLIKED_ERROR':
    default:
      return state;
  }
}