import apiInstance from '../api';
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_USER,
  FETCH_PLAYLISTS,
  FETCH_PLAYLIST
} from './types';

export const signIn = accesToken => ({
  type: SIGN_IN,
  payload: accesToken
});

export const signOut = () => ({
  type: SIGN_OUT
});

const dispatchUser = user => ({
  type: FETCH_USER,
  payload: user
});

const dispatchPlaylists = playlists => ({
  type: FETCH_PLAYLISTS,
  payload: playlists
});

const dispatchPlaylist = playlist => ({
  type: FETCH_PLAYLIST,
  payload: playlist
});

export const fetchUser = () => (dispatch, getState) => {
  const token = getState().auth.token;
  if (token) {
    return apiInstance(token)
      .get('me')
      .then(data => {
        console.log('==========------------==========');
        console.log(
          '==========-user-----------==========,',
          data.data.display_name
        );
        // document.cookie = `user=${data.data.display_name}`;
        dispatch(dispatchUser(data.data.display_name));
      })
      .catch(err => {
        console.log('==========--1234567---------==========');

        console.log(err);
        // dispatch(dispatchUser(''));
        return err;
      });
  } else {
    console.log('==========--9080989990-==========');

    console.log('fetchUser action failed, no token');
    console.log('hererererere');
    // return dispatch(dispatchUser(''));
    // throw 'err'
    // return 'err'
  }
};

export const fetchPlaylists = fetchedUser => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    // TODO - set userId in cookie to save doing an extra request?
    return apiInstance(token)
      .get(`users/${fetchedUser}/playlists`)
      .then(data => {
        dispatch(dispatchPlaylists(data.data));
      })
      .catch(err => {
        console.log('no user id', err);
      });
  } else {
    console.log('fetchUser playlists failed, no token');
  }
};

export const getUserAndPlayLists = () => (dispatch, getState) => {
  // TODO hide playlists nav button when user not logged in - HOC
  if (!getState().auth.token) {
    return Promise.resolve();
  }

  return dispatch(fetchUser()).then(() => {
    const fetchedUser = getState().auth.userId;
    console.log('-----', fetchedUser);
    return dispatch(fetchPlaylists(fetchedUser));
  });
};

export const fetchPlaylist = () => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    return apiInstance(token)
      .get(`playlists/3bIK2LomQ4bn3pnSLQa3hb`)
      .then(data => {
        dispatch(dispatchPlaylist(data.data));
      })
      .catch(err => {
        console.log('no user id', err);
      });
  } else {
    console.log('fetchUser playlists failed, no token');
  }
};
