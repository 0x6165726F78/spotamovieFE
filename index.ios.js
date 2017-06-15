import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from './app/reducers/reducers';
import api from './app/lib/api.js';
import AppContainer from './app/containers/AppContainer'
import Login from './app/containers/Login';
import { SpotifySymbol, TMDBSymbol } from './app/actions/actions';
import config from './config';


import {
  AppRegistry,
  StyleSheet,
  View, Text
} from 'react-native';



const composeEnhancers = composeWithDevTools({ realtime: true });
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(
    // api(SpotifySymbol,  'https://private-bd796b-spotamovie.apiary-mock.com'),
    api(SpotifySymbol, 'https://spotamovie.herokuapp.com'),
    api(TMDBSymbol, 'https://api.themoviedb.org/3', '?api_key=' + config.api_key)
  )
));

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

export default App

AppRegistry.registerComponent('spotamovieFE', () => App);
