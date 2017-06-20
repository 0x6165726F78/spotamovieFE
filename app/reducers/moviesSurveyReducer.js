import types from '~/actions/types';
const { GET_MOVIES_SURVEY_SUCCESS } = types;

export default (state = [], { type, response }) =>
  type === GET_MOVIES_SURVEY_SUCCESS ? response.movies : state;
