import types from '../actions/types';
const { ON_VALUE_CHANGE } = types;

const INITIAL_STATE = {
  value: 'Liked',
};

export default (state = INITIAL_STATE, { type, value }) =>
  type === ON_VALUE_CHANGE ? { ...state, value } : state;
