import { REHYDRATE } from 'redux-persist/constants';
import types from '~/actions/types';
const { LOADING, LOGIN_SUCCESS } = types;
const INITIAL_STATE = { loading: false };

export default (state = INITIAL_STATE, { type, payload, response }) => {
  switch (type) {
    case REHYDRATE:
      return payload.user
        ? { ...payload.user, firstLogin: false }
        : INITIAL_STATE;

    case LOADING:
      return { loading: true };

    case LOGIN_SUCCESS:
      return { ...response };

    default:
      return state;
  }
};
