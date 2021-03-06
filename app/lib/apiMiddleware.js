// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export const SpotifySymbol = 'apiSpotifySymbol';
export const TMDBSymbol = 'apiTMDBSymbol';
export default (symbol, baseURL, endpointSuffix = '') => {
  const callApi = (
    serverRoute,
    endpoint,
    method = 'GET',
    data,
    authentication
  ) => {
    const fullUrl = baseURL + endpoint + endpointSuffix;

    let body;
    if (data) {
      body = JSON.stringify(data);
    }
    let ok;
    return fetch(fullUrl, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: baseURL === 'http://localhost:3000'
          ? authentication
          : null,
      },
    })
      .then(response => {
        ok = response.ok;
        return response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        });
      })
      .catch(err => {
        if (ok) {
          return {};
        }
        console.error('ERROR in fetch', err);
        return Promise.reject(err);
      });
  };

  // Action key that carries API call info interpreted by this Redux middleware.
  return store => next => action => {
    const callAPI = action[symbol];
    if (typeof callAPI === 'undefined') {
      return next(action);
    }

    let { serverRoute, endpoint, method, data } = callAPI;
    const { type } = action;

    if (typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.');
    }

    let authentication;
    if (store.getState().user.userToken) {
      authentication = 'Bearer ' + store.getState().user.userToken;
    }

    const actionWith = data => {
      const finalAction = Object.assign({}, action, data);
      return finalAction;
    };

    next(actionWith({ type: type + '_REQUEST' }));

    return callApi(serverRoute, endpoint, method, data, authentication)
      .then(response => {
        next(
          actionWith({
            response,
            type: type + '_SUCCESS',
          })
        );
        if (action.success) {
          store.dispatch(action.success());
        }
      })
      .catch(error =>
        next(
          actionWith({
            type: type + '_FAILURE',
            error: error.message || 'Something bad happened',
          })
        )
      );
  };
};
