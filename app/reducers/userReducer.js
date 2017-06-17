import types from '../actions/types'
const { LOADING, LOGIN_SUCCESS, LOGOUT } = types

export default (state = { ...{ loading: false } }, action) => {
  switch (action.type) {
    case LOADING:
      return { ...{ loading: true } }
    case LOGIN_SUCCESS:
      return { ...action.response }
    case LOGOUT:
      return {}
    default:
  }
  return state
}
