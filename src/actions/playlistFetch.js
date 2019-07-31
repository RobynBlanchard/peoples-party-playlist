import axios from 'axios';
import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
  FETCH_PLAYLIST
} from './types';

// export const fetchPlaylist = () => ({
//   types: [FETCH_PLAYLIST, FETCH_PLAYLIST_SUCCESS, FETCH_PLAYLIST_FAILURE],
//   shouldCallAPI: state => state.playlists.playlist,
//   callAPI: token => spotifyApi(token).get(`playlists/${playlistId}`),
// });

export const fetchPlaylist = () => (dispatch, getState) => {
  axios
    .get('http://localhost:5000/playlist/api/v1/tracks')
    .then(resp => {
      if (resp.status === 200) {
        return dispatch({
          type: 'FETCH_PLAYLIST_FROM_DB_SUCCESS',
          payload: resp.data.tracks,
        })
      }
    })
    .catch(err => {
      console.log('error: ', err);
    });
};
