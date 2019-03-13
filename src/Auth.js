require('dotenv').config();

import request from 'request';

const ClientID = process.env.clientID;
const ClientSecret = process.env.client_secret;
const stateKey = 'spotify_auth_state';
const redirectURI = 'http://localhost:3000/callback';

const authURL = (state) => {
  const spotifyAuthURI = 'https://accounts.spotify.com/authorize';
  const responseType = 'code';
  const scopes = [
    'user-read-private',
    'user-modify-playback-state',
    'user-read-private',
    'playlist-modify-public',
    'streaming',
    'user-read-email',
  ];

  return `${spotifyAuthURI}?` +
  `client_id=${ClientID}` +
  `&response_type=${responseType}` +
  `&redirect_uri=${redirectURI}` +
  `&scope=${scopes.join('%20')}` +
  `&state=${state}` +
  `&show_dialog=true`
}

const randomString = () => {
  return Math.random().toString(36).substring(2, 16);
};

export const logIn = (req, res) => {
  const state = randomString();

  res.cookie(stateKey, state);

  res.redirect(authURL(state))
};

export const logOut = (req, res) => {
  res.clearCookie('spotifyAccessToken');
  res.clearCookie('spotifyRefreshToken');
  res.redirect('/')
};

export const loginCallback = (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies[stateKey];

  if (!state || state !== storedState) {
    // state not valid
    res.redirect('/LogInFailure');
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectURI,
        grant_type: 'authorization_code'
      },
      headers: { 'Authorization': 'Basic ' + (new Buffer(ClientID + ':' + ClientSecret).toString('base64')) },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        res.cookie('spotifyAccessToken', access_token);
        res.cookie('spotifyRefreshToken', refresh_token);

        // res.redirect('/LogInSuccess');
        res.redirect('/');
      } else {
        // Invalid token
        // or user pressed cancel?
        res.redirect('/LogInFailure');
      }
    });
  }
};
