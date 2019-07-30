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
  console.log('fetch playis!!!!')
  axios
    .get('http://localhost:5000/playlist/api/v1/tracks')
    .then(resp => {
  console.log(' res fetch playis!!!!')

      if (resp.status === 200) {
        return dispatch({
          type: 'PLAYLIST',
          payload: resp.data.tracks,
        })
      }
    })
    .catch(err => {
      console.log('hee=====================init',)

      console.log('error -- ', err);
    });
};
