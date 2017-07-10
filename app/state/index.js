import { createStore, applyMiddleware, combineReducers } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import reducers from '~/reducers';
import api, { SpotifySymbol, TMDBSymbol } from '~/lib/apiMiddleware.js';
import { persistStoreAsync, purgeStoreAsync } from '~/lib/reduxPersistWrapper';
import config from '~/config';

const { DEV_URL, API_URL } = config;

const store = createStore(
  reducers,
  applyMiddleware(
    api(SpotifySymbol, DEV_URL),
    api(TMDBSymbol, API_URL, `?api_key=${config.api_key}`),
    createLogger()
  ),
  autoRehydrate()
);

purgeStoreAsync(store);

export default store;
