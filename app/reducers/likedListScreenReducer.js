import types from '../actions/types'
const { ON_VALUE_CHANGE } = types

const INITIAL_STATE = {
  value: 'Liked', // Liked || Disliked
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_VALUE_CHANGE:
      return Object.assign({}, state, { value: action.value })

    default:
      return state
  }
}
