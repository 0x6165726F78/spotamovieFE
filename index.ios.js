import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from './app/reducers';
import api from './app/lib/api.js';
import { SpotifySymbol, TMDBSymbol } from './app/actions';
import config from './config';
import { AppRegistry } from 'react-native';
import createLogger from 'redux-logger';
import Router from './app/navigation';
import './app/utils/languages';

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(
    api(SpotifySymbol, 'https://private-bd796b-spotamovie.apiary-mock.com'),
    // api(SpotifySymbol, 'http://localhost:3000'),
    api(TMDBSymbol, 'https://api.themoviedb.org/3', '?api_key=' + config.api_key),
    createLogger()
  )
));
const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
)

export default App
AppRegistry.registerComponent('spotamovieFE', () => App);
