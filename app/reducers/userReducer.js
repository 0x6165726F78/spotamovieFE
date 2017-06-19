import { REHYDRATE } from 'redux-persist/constants'
import types from '../actions/types'
const { LOADING, LOGIN_SUCCESS, LOGOUT } = types

export default (state = { ...{ loading: false } }, action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.user
        ? Object.assign({}, action.payload.user, { firstLogin: false })
        : { ...{ loading: false } }

    case LOADING:
      return { ...{ loading: true } }
    case LOGIN_SUCCESS:
      return { ...action.response }

    default:
  }
  return state
}
