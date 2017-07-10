import types from '../actions/types';
const { GET_MOVIES_RECOMMENDATION_SUCCESS } = types;

export default (state = [], { type, response }) =>
  type === GET_MOVIES_RECOMMENDATION_SUCCESS ? response.movies : state;
