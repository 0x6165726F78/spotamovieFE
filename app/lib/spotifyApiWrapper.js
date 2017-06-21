import { Linking } from 'react-native';
import querystring from 'querystring';
import config from '../config';
const scope = 'user-read-private user-read-email playlist-read-private';
const state = generateRandomString(16);

function generateRandomString(length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

const query =
  'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: config.client_id,
    scope: scope,
    redirect_uri: config.redirect_uri,
    state: state,
  });

export function spotifyOauth() {
  Linking.openURL(query);
}
