import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  REORDER_TRACK,
  REMOVE_FROM_PLAYLIST,
  REMOVE_TRACK,
  REMOVE_TRACK_SUCCESS,
  REMOVE_TRACK_FAILURE,
  ADD_TO_PLAYLIST,
  RESUME_PLAYBACK,
  ADD_TO_SPOTIFY_PLAYLIST,
  ADD_TO_SPOTIFY_PLAYLIST_SUCCESS,
  ADD_TO_SPOTIFY_PLAYLIST_FAILURE,
  REORDER_TRACK_SPOTIFY,
  REORDER_TRACK_SPOTIFY_SUCCESS,
  REORDER_TRACK_SPOTIFY_FAILURE,
  UPDATE_TRACK_IN_DB,
  UPDATE_TRACK_IN_DB_SUCCESS,
  UPDATE_TRACK_IN_DB_FAILURE,
  ADD_TRACK_TO_DB,
  ADD_TRACK_TO_DB_SUCCESS,
  ADD_TRACK_TO_DB_FAILURE,
  UPDATE_VOTE
} from './types';

import axios from 'axios';

function sendSocketMessage(action) {
  return {
    handler: 'WS',
    ...action
  };
}

export const reOrderTrackSpotify = (range_start, insert_before) => ({
  types: [
    REORDER_TRACK_SPOTIFY,
    REORDER_TRACK_SPOTIFY_SUCCESS,
    REORDER_TRACK_SPOTIFY_FAILURE
  ],
  callAPI: token =>
    spotifyApi(token).put(`playlists/${playlistId}/tracks`, {
      range_start,
      insert_before
    }),
  payload: { range_start, insert_before }
});

const spotifyOffset = () => {
  return axios.get('/playlist/api/v1/tracks', { params:
    { removed: true, locked: true}
  }).then(res => {
    const offset = res.data.res.length;
    debugger;
    return offset
  })
  //  count
}

const findPositionFromUri = uri => {
  // filter out removed and locked
  // sort
  // find position

  // count number removed and locked (if not removing from spotify)
  // ^ might make sense to change this later

  // tell spotify to move track from old position + above count to new position + above count


  return axios.get('/playlist/api/v1/tracks').then(resp => {
    if (resp.status === 200) {
      const index = resp.data.tracks.map(e => e.uri).indexOf(uri);
      return {index, updatedAt: resp.data.tracks[index].updatedAt};
    }
  });
};

// TODO: better name]

// change to just updated track
export const updateTrackVotesInDB = (uri, vote) => ({
  types: [
    UPDATE_TRACK_IN_DB,
    UPDATE_TRACK_IN_DB_SUCCESS,
    UPDATE_TRACK_IN_DB_FAILURE
  ],
  callAPI: () =>
    axios.patch(`/playlist/api/v1/tracks/${uri}`, {
      vote: vote
    })
  // payload: { range_start, insert_before }
});

export const updateTrack = (uri, update) => (dispatch, getState) => {
  dispatch({
    types: [
      UPDATE_TRACK_IN_DB,
      UPDATE_TRACK_IN_DB_SUCCESS,
      UPDATE_TRACK_IN_DB_FAILURE
    ],
    callAPI: () =>
      // axios.patch(`/playlist/api/v1/tracks/${uri}`, {
      //   lock: true
      // })
      axios.patch(`/playlist/api/v1/tracks/${uri}`, update)

  })
}

export const updateTrackNumOfVotes = (uri, position, change) => (dispatch, getState) => {
  let newPosition;
  let newTS;
  // could work out new position first - instead of from db
  // change should be 1 or -1

  // will send socket to update vote
  return dispatch(updateTrackVotesInDB(uri, change))
    // get the new position of the track in the playlist
    .then(resp => {
      debugger;
      // TODO: fix
      // if (resp.type === UPDATE_TRACK_IN_DB_SUCCESS) {
        // TODO: fix
        // newTS = resp.data.track.timestamp;

        return findPositionFromUri(uri);
        // TODO: instead use find one and update
      // }
    }).then(data => {
      newPosition = data.index;
      newTS = data.updatedAt

      if (newPosition === position) {
        // TODO: not this
        throw new Error('no need')
        // return;
      }

      return spotifyOffset();
    })
    // update spotify playlist with new track position
    .then(offset => {
      debugger;
      // TODO: position will now be off

      const range_start = offset + position;
      const range_end = offset + newPosition;


      // only call if position has changed!
      return dispatch(reOrderTrackSpotify(range_start, range_end));
    })
    // track was updated in spotify and db successfully
    // -> display increase vote to user
    .then(data => {
      if (data.type === 'REORDER_TRACK_SPOTIFY_SUCCESS') {
        // const payload = {
        //   position: position,
        //   change: change,
        //   updatedAt: newTS
        // };

        // return dispatch(
        //   sendSocketMessage({ type: UPDATE_VOTE, payload: payload })
        // );

        const payload = {
          insert_before: newPosition,
          range_start: position
        };
        return dispatch(
          sendSocketMessage({ type: 'REORDER_TRACK', payload: payload })
        );
      }
    })
    // -> re-order track in ui
    // .then(resp => {
    //   const payload = {
    //     insert_before: newPosition,
    //     range_start: position
    //   };
    //   return dispatch(
    //     sendSocketMessage({ type: 'REORDER_TRACK', payload: payload })
    //   );
    // })
    .catch(err => {
      debugger;
      console.log('error adding vote', err);
    });
};


export const addTrackToDb = (uri, name, artist) => ({
  types: [ADD_TRACK_TO_DB, ADD_TRACK_TO_DB_SUCCESS, ADD_TRACK_TO_DB_FAILURE],
  callAPI: () =>
    axios.post('/playlist/api/v1/tracks', {
      uri: uri,
      name: name,
      artist: artist
    })
});

export const addToSpotifyPlaylist = (uri, position) => ({
  types: [
    ADD_TO_SPOTIFY_PLAYLIST,
    ADD_TO_SPOTIFY_PLAYLIST_SUCCESS,
    ADD_TO_SPOTIFY_PLAYLIST_FAILURE
  ],
  callAPI: token =>
    spotifyApi(token).post(
      `playlists/${playlistId}/tracks?uris=${uri}&position=${position}`
    ),
  payload: {
    position
  }
});

export const addToPlaylist = (uri, name, artist) => (dispatch, getState) => {
  let newPosition;
  dispatch(addTrackToDb(uri, name, artist))
    .then(resp => {
      if (resp.type === ADD_TRACK_TO_DB_SUCCESS) {
        return findPositionFromUri(uri);
      }
    })
    .then(index => {
      // TODO: add offset
      // spotifyOffset()
      newPosition = index;

      return spotifyOffset();
    })
    .then(offset => {

      return dispatch(addToSpotifyPlaylist(uri, newPosition + offset));
    })
    .then(data => {
      if (data.type === ADD_TO_SPOTIFY_PLAYLIST_SUCCESS) {
        const track = {
          artist,
          name,
          votes: 0,
          uri
        };
        const payload = {
          position: newPosition,
          track: track
        };
        return dispatch(
          sendSocketMessage({ type: ADD_TO_PLAYLIST, payload: payload })
        );
      }
      // else TODO:
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


// export const removeTrack = (uri, position) => (dispatch, getState) => {
  // dispatch(removeTrackFromSpotifyPlaylist(uri, position)).then(data => {
  //   if (data.type === REMOVE_TRACK_SUCCESS) {
  //     // To force refresh ?
  //     return dispatch(decreaseVote(uri));
  //   }
  // });
// };
