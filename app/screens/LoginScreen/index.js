import React, { Component, PropTypes } from 'react';
import base64 from 'base-64';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { login, logout, loading } from '../../actions'
import config from '../../../config';
import querystring from 'querystring';
import { Buffer } from 'buffer';
import styles from './styles'
import { Spinner } from 'nachos-ui';
import Wizard from '../../components/Wizard';
import I18n from 'react-native-i18n';

import {
  Animated,
  StyleSheet,
  View,
  NavigationExperimental,
  Text,
  AppRegistry,
  TouchableHighlight,
  Linking,
  Button,
  Image,
  StatusBar
} from 'react-native';



const generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const scope = 'user-read-private user-read-email playlist-read-private';
const state = generateRandomString(16);
const query = ('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: config.client_id,
    scope: scope,
    redirect_uri: config.redirect_uri,
    state: state
  }))
function spotifyOauth() {
  Linking.openURL(query);
}


class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  handleOpenSpotifyURL(event) {
    let code = event.url.match(/code=(.+)\&/);
    code = code[1];
    this.props.login(code);
  }

  handleGreeting() {
    if (this.props.user.name !== undefined) {
      return <Text style={styles.startText}>{I18n.t('welcome')} {this.props.user.name}</Text>
    } else {
      return <Text style={styles.startText}>{I18n.t('welcome')}</Text>
    }
  }

  handleLogin() {
    this.props.loading()
    spotifyOauth()
    Linking.addEventListener('url', this.handleOpenSpotifyURL.bind(this));

  }

  handleLogout() {
    this.props.logout()
    this.setState({ userLogged: false })
  }

  renderLoginScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.containerWelcome}>
          <Text style={styles.welcome}>
            SPOT A MOVIE
          </Text>
        </View>
        <View style={styles.containerSubheading}>
          <Text style={styles.subheading}>{I18n.t('recommendations')}</Text>
        </View>
        <View style={styles.containerInstructions}>
          <Text style={styles.instructions}>{I18n.t('signIn')}</Text>
        </View>
        <View style={styles.startContainer}>
          <TouchableHighlight
            style={styles.start}
            onPress={this.handleLogin.bind(this)}
            underlayColor='red'>
            <View style={styles.loginButtonContainer}>
              <Image style={styles.spotifyIcon} source={require('./spotifyIconBlack.png')} />
              <Text style={styles.startText}>{I18n.t('signButton')}</Text>
            </View>
          </TouchableHighlight>
        </View>


      </View>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userToken) {
      this.props.navigation.navigate('Wizard')
    }
  }

  render() {

    if (this.props.user.loading) {
      return (
        <View style={styles.containerLoader}>
          <View style={styles.titleView}>
            <Text style={styles.title}>
              {I18n.t('logging')}
            </Text>
            <Spinner color="#94de45" />
          </View>
          <StatusBar hidden />
        </View>
      );
    }
    if (this.props.user.userToken) {
      return (
        <Wizard />
      );
    } else {
      return (
        this.renderLoginScreen()
      )
    }

  }
}

const mapDispatchToProps = (dispatch) => ({
  loading: () => dispatch(loading()),
  login: (code) => dispatch(login(code)),
  logout: () => dispatch(logout())
})

const mapStateToProps = (state) => ({
  navigationState: state.navigationState,
  user: state.user,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
