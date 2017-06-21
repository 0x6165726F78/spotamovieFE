import * as ActionCreators from '../actions';
import { SpotifySymbol, TMDBSymbol } from '../lib/apiMiddleware.js';

describe('Action creators for SpotifySymbol', () => {
  it('getMoviesLiked', () => {
    const expectedAction = {
      type: 'GET_MOVIES_LIKED',
      [SpotifySymbol]: {
        endpoint: `/movies/liked`,
        method: 'GET',
      },
    };
    expect(ActionCreators.getMoviesLiked()).toEqual(expectedAction);
  });
  it('getMoviesDisliked', () => {
    const expectedAction = {
      type: 'GET_MOVIES_DISLIKED',
      [SpotifySymbol]: {
        endpoint: `/movies/disliked`,
        method: 'GET',
      },
    };
    expect(ActionCreators.getMoviesDisliked()).toEqual(expectedAction);
  });
  it('dislikeMovie', () => {
    const movieId = '11';
    const expectedAction = {
      type: 'DISLIKE_MOVIE',
      movieId,
      [SpotifySymbol]: {
        endpoint: `/movies/${movieId}/dislike`,
        method: 'POST',
      },
    };
    expect(ActionCreators.dislikeMovie(movieId)).toEqual(expectedAction);
  });
  it('likeMovie', () => {
    const movieId = '11';
    const expectedAction = {
      type: 'LIKE_MOVIE',
      movieId,
      [SpotifySymbol]: {
        endpoint: `/movies/${movieId}/like`,
        method: 'POST',
      },
    };
    expect(ActionCreators.likeMovie(movieId)).toEqual(expectedAction);
  });
  it('unLikeMovie', () => {
    const movieId = '11';
    const expectedAction = {
      type: 'UNLIKE_MOVIE',
      movieId,
      [SpotifySymbol]: {
        endpoint: `/movies/${movieId}/unlike`,
        method: 'POST',
      },
    };
    expect(ActionCreators.unLikeMovie(movieId)).toEqual(expectedAction);
  });
  it('unDislikeMovie', () => {
    const movieId = '11';
    const expectedAction = {
      type: 'UNDISLIKE_MOVIE',
      movieId,
      [SpotifySymbol]: {
        endpoint: `/movies/${movieId}/undislike`,
        method: 'POST',
      },
    };
    expect(ActionCreators.unDislikeMovie(movieId)).toEqual(expectedAction);
  });
});

describe('Action creators for TMDB', () => {
  it('getMovieFromId', () => {
    const movieId = '11';
    const list = false;
    const expectedAction = {
      type: 'GET_MOVIE',
      list,
      [TMDBSymbol]: {
        endpoint: `/movie/${movieId}`,
        method: 'GET',
      },
    };
    expect(ActionCreators.getMovieFromId(movieId)).toEqual(expectedAction);
  });
});

describe('Action creators for LOGIN', () => {
  it('login', () => {
    const code = 'fjdslfjsf9344282';
    const expectedAction = {
      type: 'LOGIN',
      [SpotifySymbol]: {
        endpoint: '/login',
        method: 'POST',
        data: {
          code: code,
        },
      },
    };
    expect(ActionCreators.login(code)).toEqual(expectedAction);
  });
});
