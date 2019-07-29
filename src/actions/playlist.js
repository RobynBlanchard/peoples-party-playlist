import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  REORDER_TRACK,
  REORDER_TRACK_SUCCESS,
  REORDER_TRACK_FAILURE,
  REMOVE_FROM_PLAYLIST,
  REMOVE_TRACK,
  REMOVE_TRACK_SUCCESS,
  REMOVE_TRACK_FAILURE,
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE
} from './types';

import axios from 'axios';

export const reOrderTrack = (range_start, insert_before) => ({
  types: [REORDER_TRACK, REORDER_TRACK_SUCCESS, REORDER_TRACK_FAILURE],
  callAPI: token =>
    spotifyApi(token).put(`playlists/${playlistId}/tracks`, {
      range_start,
      insert_before
    }),
  payload: { range_start, insert_before }
});

export const handleVoteIncrease = (uri, position) => (dispatch, getState) => {
  axios
    .post('/add-vote', {
      uri: uri
    })
    .then(resp => {
      return axios.get('/playlist-fetch');
    })
    .then(resp => {
      const index = resp.data.playlist.map(e => e.uri).indexOf(uri);
      return dispatch(reOrderTrack(position, index));
    })
    .catch(err => {
      console.log('error adding vote');
    });
};

export const handleVoteDecrease = (uri, position) => (dispatch, getState) => {
  axios
    .post('/decrement-vote', {
      uri: uri
    })
    .then(resp => {
      return axios.get('/playlist-fetch');
    })
    .then(resp => {
      console.log(resp);
      const index = resp.data.playlist.map(e => e.uri).indexOf(uri);
      return dispatch(reOrderTrack(position, index));
    })
    .catch(err => {
      console.log(err);
      console.log('error decrementing vote');
    });
};

export const addToSpotifyPlaylist = (uri, position) => ({
  types: [ADD_TO_PLAYLIST, ADD_TO_PLAYLIST_SUCCESS, ADD_TO_PLAYLIST_FAILURE],
  callAPI: token =>
    spotifyApi(token).post(
      `playlists/${playlistId}/tracks?uris=${uri}&position=${position}`
    ),
  payload: {
    position
  }
});

export const addToPlaylist = (uri, name, artist) => (dispatch, getState) => {
  axios
    .post('/add-to-playlist', { uri: uri, name: name, artist: artist })
    .then(resp => {
      // instead fetch playlist and get query to return array of uris then find index
      return axios.get('/playlist-fetch');
    })
    .then(resp => {
      const index = resp.data.playlist.map(e => e.uri).indexOf(uri);
      return dispatch(addToSpotifyPlaylist(uri, index));
    })
    .catch(err => {
      console.log('error', err);
    });
};

// export const removeFromPlaylist = position => ({
//   type: REMOVE_FROM_PLAYLIST,
//   payload: position
// });

// export const removeTrackFromSpotifyPlaylist = (uri, position) => ({
//   types: [REMOVE_TRACK, REMOVE_TRACK_SUCCESS, REMOVE_TRACK_FAILURE],
//   callAPI: token =>
//     spotifyApi(token).delete(`playlists/${playlistId}/tracks`, {
//       data: {
//         tracks: [{ uri }]
//       }
//     }),
//   payload: { position }
// });

// export const removeTrack = (uri, position) => (dispatch, getState) => {
//   dispatch(removeTrackFromSpotifyPlaylist(uri, position)).then(data => {
//     if (data.type === REMOVE_TRACK_SUCCESS) {
//       // To force refresh ?
//       return dispatch(decreaseVote(uri));
//     }
//   });
// };
