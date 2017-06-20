import types from '../actions/types';
const {
  GET_MOVIES_DISCOVER_SUCCESS,
  GET_MOVIES_DISCOVER_ERROR,
  GET_MOVIE_SUCCESS,
  RESET_MOVIES,
  GET_MOVIE_ERROR,
} = types;

export default (state = [], action) => {
  switch (action.type) {
    case GET_MOVIES_DISCOVER_SUCCESS:
      if (action.response.results) {
        let parsedMovies = parseMovies(action.response.results);
        return parsedMovies;
      }
      return state;

    case GET_MOVIES_DISCOVER_ERROR:
      console.log('ERROR IN REDUCERS:', action.error);
      return state;

    case GET_MOVIE_SUCCESS:
      if (action.list) {
        return state;
      }

      if (action.response) {
        const movie = action.response;
        if (state.find(movie => movie.id === action.response.id)) {
          return state.map(movie => {
            if (movie.id === action.response.id) {
              return parseMovie(action.response);
            }
            return movie;
          });
        }
        return [...state, parseMovie(action.response)];
      }
      return state;

    case RESET_MOVIES:
      console.log('Reset Movies Reducer');
      return [];

    case GET_MOVIE_ERROR:
      console.log('ERROR IN REDUCERS:', action.error);
      return state;

    default:
      return state;
  }
};

function parseMovie(data) {
  return {
    seen: false,
    poster_path: data.poster_path,
    id: data.id,
    title: data.title,
    overview: data.overview,
    voteAverage: data.vote_average,
    genres: data.genres,
    releaseDate: data.release_date,
    backdropPath: data.backdrop_path,
  };
}

function parseMovies(moviesArray) {
  return moviesArray.map(movie => parseMovie(movie));
}

function parseMoviesSurvey(moviesArray) {
  return moviesArray.map(movie => ({
    movieSurveyId: movie,
  }));
}
