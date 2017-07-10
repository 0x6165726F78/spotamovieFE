console.ignoredYellowBox = ['Warning: View.propTypes'];
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Router from './navigation';
import store from './state';

const App = () =>
  <Provider store={store}>
    <Router />
  </Provider>;

AppRegistry.registerComponent('spotamovieFE', () => App);
