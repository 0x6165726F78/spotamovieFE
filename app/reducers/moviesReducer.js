import types from '~/actions/types';
const { GET_MOVIE_SUCCESS, RESET_MOVIES } = types;

export default (state = [], { type, list, response }) => {
  switch (type) {
    case GET_MOVIE_SUCCESS: {
      if (list) {
        return state;
      }

      if (state.find(movie => movie.id === response.id)) {
        return state.map(movie => {
          if (movie.id === response.id) {
            return parseMovie(response);
          }
          return movie;
        });
      }
      return [...state, parseMovie(response)];
    }

    case RESET_MOVIES:
      return [];

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
