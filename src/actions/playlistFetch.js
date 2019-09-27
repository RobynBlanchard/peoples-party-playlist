import axios from 'axios';
import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  FETCH_PLAYLIST_FROM_DB,
  FETCH_PLAYLIST_FROM_DB_SUCCESS,
  FETCH_PLAYLIST_FROM_DB_FAILURE
} from './types';

// import * as process from 'process';
// const env = process.env.NODE_ENV
// console.log(process.env.NODE_ENV)
console.log('hkkhjkhkjhkh')
console.log(process.env.NODE_ENV)
console.log(process.env.PRODUCTION)
// console.log(env)

export const fetchPlaylist = () => dispatch => {
  const endpoint =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000'
          : 'https://peoples-party-playlist.herokuapp.com';
  dispatch({
    types: [
      FETCH_PLAYLIST_FROM_DB,
      FETCH_PLAYLIST_FROM_DB_SUCCESS,
      FETCH_PLAYLIST_FROM_DB_FAILURE
    ],
    callAPI: () => {
      // console.log(process.env.NODE_ENV)
      console.log('ev', process.env.NODE_ENV)
      // console.log(process.env.PRODUCTION)
      // console.log(DUCTION)
      // console.log(process.env.DUCTION)

      // console.log(process.env)
      const p = require('process');
      console.log('===', p.env.NODE_ENV)
      
      // console.log('envvv', env)
      return axios.get(`${endpoint}/api/v1/playlist/tracks`)
    }
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
