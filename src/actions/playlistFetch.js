import axios from 'axios';
import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  FETCH_PLAYLIST_FROM_DB,
  FETCH_PLAYLIST_FROM_DB_SUCCESS,
  FETCH_PLAYLIST_FROM_DB_FAILURE
} from './types';

export const fetchPlaylist = () => dispatch => {
  const endpoint =
    // process.env.NODE_ENV === 'development'
      // ? 'http://localhost:5000'
      // : 'https://peoples-party-playlist.herokuapp.com';
  dispatch({
    types: [
      FETCH_PLAYLIST_FROM_DB,
      FETCH_PLAYLIST_FROM_DB_SUCCESS,
      FETCH_PLAYLIST_FROM_DB_FAILURE
    ],
    // callAPI: () => axios.get(`${endpoint}/api/v1/playlist/tracks`)
    callAPI: () => axios.get(`http://localhost:5000/api/v1/playlist/tracks`)
  });
};

// export const fetchPlaylist = () => (dispatch, getState) => {
//   axios
//     .get('http://localhost:5000/playlist/api/v1/tracks', {
//       params: { removed: false }
//     })
//     .then(resp => {
//       if (resp.status === 200) {
//         return dispatch({
//           type: 'FETCH_PLAYLIST_FROM_DB_SUCCESS',
//           payload: resp.data.tracks
//         });
//       }
//     })
//     .catch(err => {
//       console.log('error: ', err);
//     });
// };
