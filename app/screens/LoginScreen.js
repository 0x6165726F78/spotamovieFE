import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Linking,
  Image,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import * as ActionCreators from '~/actions';
import { LoadingView } from '~/components';
import colors from '~/colors';
import { spotifyOauth } from '~/lib/spotifyApiWrapper';
import I18n from 'react-native-i18n';
const { backgroundColor, darkGreenColor } = colors;

@connect(data => LoginScreen.getDataProps, ActionCreators)
export default class LoginScreen extends Component {
  static getDataProps = ({ user }) => ({ user });

  static navigationOptions = {
    header: null,
  };

  _handleOpenSpotifyURL = event => {
    this.props.login(event.url.match(/code=(.+)\&/)[1]);
  };

  _handleLogin = () => {
    this.props.loading();
    spotifyOauth();
    Linking.addEventListener('url', this._handleOpenSpotifyURL);
  };

  _renderMainView() {
    return (
      <View style={styles.container}>
        <View style={styles.containerWelcome}>
          <Text style={styles.welcome}>
            SPOT A MOVIE
          </Text>
        </View>
        <View style={styles.containerSubheading}>
          <Text style={styles.subheading}>
            {I18n.t('recommendations')}
          </Text>
        </View>
        <View style={styles.containerInstructions}>
          <Text style={styles.instructions}>
            {I18n.t('signIn')}
          </Text>
        </View>
        <View style={styles.startContainer}>
          <TouchableHighlight
            style={styles.start}
            onPress={this._handleLogin}
            underlayColor="red"
          >
            <View style={styles.loginButtonContainer}>
              <Image
                style={styles.spotifyIcon}
                source={require('../assets/spotifyIconBlack.png')}
              />
              <Text style={styles.startText}>
                {I18n.t('signButton')}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <StatusBar hidden />
      </View>
    );
  }

  componentWillReceiveProps({ user }) {
    if (user.userToken) {
      user.firstLogin
        ? this.props.navigation.navigate('Wizard')
        : this.props.navigation.navigate('Suggestions');
    }
  }

  render() {
    return this.props.user.loading
      ? <LoadingView title={I18n.t('logging')} />
      : this._renderMainView();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerWelcome: {
    marginTop: 80,
  },
  welcome: {
    color: 'white',
    fontFamily: 'Raleway-Black',
    fontSize: 80,
    textAlign: 'center',
  },
  containerSubheading: {
    paddingTop: 30,
    paddingRight: 70,
    paddingLeft: 70,
    flex: 0.45,
  },
  subheading: {
    color: 'white',
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  containerInstructions: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  instructions: {
    color: 'grey',
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
  startContainer: {
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  start: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: darkGreenColor,
    borderRadius: 30,
    borderWidth: 1,
  },
  startText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  loginButtonContainer: {
    flexDirection: 'row',
  },
  spotifyIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
