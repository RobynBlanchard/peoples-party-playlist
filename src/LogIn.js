require('dotenv').config();

import querystring from 'query-string';
import request from 'request';

const ClientID = process.env.clientID;
const ClientSecret = process.env.client_secret;
const stateKey = 'spotify_auth_state';
const redirectURI = 'http://localhost:3000/callback';

const randomString = () => {
  return Math.random().toString(36).substring(2, 16);
};

export const logIn = (req, res) => {
  const spotifyAuthURI = 'https://accounts.spotify.com/authorize';
  const state = randomString();
  const responseType = 'code';
  const scopes = [
    'user-read-private',
    'user-modify-playback-state',
    'user-read-private',
    'playlist-modify-public',
    'streaming',
    'user-read-email',
  ];

  res.cookie(stateKey, state);

  res.redirect(
    `${spotifyAuthURI}?` +
    `client_id=${ClientID}` +
    `&response_type=${responseType}` +
    `&redirect_uri=${redirectURI}` +
    `&scope=${scopes.join('%20')}` +
    `&state=${state}`
  );
};

export const loginCallback = (req, res) => {
  console.log(req)
  const { code, state } = req.query;
  const storedState = req.cookies[stateKey];

  if (!state || state !== storedState) {
    // res.redirect('/#' +
    //   querystring.stringify({
    //     error: 'state_mismatch'
    //   }));
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

        res.redirect('/LogInSuccess');

      } else {
        res.redirect('/LogInFailure');
        // res.redirect('/#' +
        //   querystring.stringify({
        //     error: 'invalid_token'
        //   }));
      }
    });
  }
};

// referrer - keep same page after log in