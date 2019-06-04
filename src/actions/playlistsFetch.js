import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  FETCH_USER,
  FETCH_PLAYLISTS,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
  FETCH_PLAYLIST,
} from './types';
import { fetchUser } from './user';

const dispatchUser = user => ({
  type: FETCH_USER,
  payload: user
});

const dispatchPlaylists = playlists => ({
  type: FETCH_PLAYLISTS,
  payload: playlists
});

// export const fetchUser = () => (dispatch, getState) => {
//   const token = getState().auth.token;
//   if (token) {
//     return spotifyApi(token)
//       .get('me')
//       .then(data => {
//         dispatch(dispatchUser(data.data.display_name));
//       })
//       .catch(err => {
//         console.log(err);
//         return err;
//       });
//   } else {
//     console.log('fetchUser action failed, no token');
//   }
// };
export const fetchPlaylists = fetchedUser => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    // TODO - set userId in cookie to save doing an extra request?
    return spotifyApi(token)
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
    return dispatch(fetchPlaylists(fetchedUser));
  });
};