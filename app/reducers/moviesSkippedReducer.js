import types from '../actions/types'
const { SKIP_MOVIE } = types

export default (state = [], action) => {
  switch (action.type) {
    case SKIP_MOVIE:
    default:
      return state
  }
}
