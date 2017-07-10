function defineActionTypes(types) {
  return types.reduce((types, typeName) => {
    const REQUEST = `${typeName}_REQUEST`;
    const SUCCESS = `${typeName}_SUCCESS`;
    const ERROR = `${typeName}_ERROR`;

    types[typeName] = typeName;
    types[REQUEST] = REQUEST;
    types[SUCCESS] = SUCCESS;
    types[ERROR] = ERROR;

    return types;
  }, {});
}

export default defineActionTypes([
  'GET_MOVIE',
  'GET_MOVIES_RECOMMENDATION',
  'GET_MOVIES_LIKED',
  'GET_MOVIES_DISLIKED',
  'GET_MOVIES_SURVEY',
  'LOADING',
  'LOGIN',
  'LOGOUT',
  'LIKE_MOVIE',
  'DISLIKE_MOVIE',
  'UNLIKE_MOVIE',
  'UNDISLIKE_MOVIE',
  'RESET_MOVIES',
  'ON_VALUE_CHANGE',
]);
