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
  payload: { range_start, insert_before: insert_before + 1 }
});

export const spotifyOffset = query => {
  return axios.get('/playlist/api/v1/tracks', { params: query }).then(res => {
    return res.data.tracks.length;
  });
};

const findPositionFromUri = uri => {
  return axios
    .get('/playlist/api/v1/tracks', {
      params: { removed: false, locked: false }
    })
    .then(resp => {
      if (resp.status === 200) {
        const index = resp.data.tracks.map(e => e.uri).indexOf(uri);
        return { index, updatedAt: resp.data.tracks[index].updatedAt };
      }
    });
};

export const updateTrack = (uri, update) => (dispatch, getState) => {
  dispatch({
    types: [
      UPDATE_TRACK_IN_DB,
      UPDATE_TRACK_IN_DB_SUCCESS,
      UPDATE_TRACK_IN_DB_FAILURE
    ],
    callAPI: () => axios.patch(`/playlist/api/v1/tracks/${uri}`, { update })
  });
};

export const updateTrackNumOfVotes = (uri, position, change) => (
  dispatch,
  getState
) => {

  // either store position in db
  // or hope that :
  // db.tracks.find({})
  //  .projection({})
  //  .sort({votes:-1, updatedAt: 1})
  //  .limit(100)
  // will return same results

  let currentPlaylist = getState().playlists.playablePlaylist;
  currentPlaylist[position].votes + change;
  const sortedPlaylist = currentPlaylist.sort((a,b) =>  a.votes - b.votes || a.updatedAt - b.updatedAt);

  const newPosition = sortedPlaylist.map(e => e.uri).indexOf(uri);

  if (newPosition === position) {
    dispatch(
      updateTrack(uri, {
        //TODO: $push: { users: userId },
        $inc: { votes: change },
        $set: { updatedAt: new Date().toISOString() }
      })
    )
    // and maybe position ?
  } else {
    const removedPlaylist = getState().playlists.removedPlaylist;
    const lockedTrack = getState().playlists.lockedTrack;

    const spotifyOffset = removedPlaylist.length + lockedTrack.length;

    const range_start = spotifyOffset + position;

    let range_end = spotifyOffset + newPosition;

    if (change == -1) {
      range_end = range_end + 1;
    }

    return dispatch(reOrderTrackSpotify(range_start, range_end)).then(res => {
      if (res.type === 'REORDER_TRACK_SPOTIFY_SUCCESS') {
        dispatch(
          updateTrack(uri, {
            //TODO: $push: { users: userId },
            $inc: { votes: change },
            $set: { updatedAt: new Date().toISOString() }
          })
        ).then(res => {
          const payload = {
            insert_before: newPosition,
            range_start: position
          };
          return dispatch(
            sendSocketMessage({ type: 'REORDER_TRACK', payload: payload })
          );
        })
      }
    })
  }

  // 1. post new playlist? - https://developer.spotify.com/documentation/web-api/reference/playlists/replace-playlists-tracks/
  // 2. get offset and move in spotify
  // 2. get offset via db ? or store removed locally ?
  // for now get via db but todo - get locally - if quicker?









  // could add position to mongo
  // or fetch from spotify

  // need to fetch playlist from db to get votes

  // store position in db - fetch playlist, sort by position
  // find out if can sort by votes and updated at
  // or fetch playlist from spotify and map on votes

  // sort locally



  // could work out new position first - instead of from db
  // change should be 1 or -1

  // will send socket to update vote
  return (
    // work out locally
    // update spotify
    // update mongo


    dispatch(
      updateTrack(uri, {
        //TODO: $push: { users: userId },
        $inc: { votes: change },
        $set: { updatedAt: new Date().toISOString() }
      })
    )
      // get the new position of the track in the playlist
      .then(resp => {
        // TODO: fix
        // if (resp.type === UPDATE_TRACK_IN_DB_SUCCESS) {
        // TODO: fix
        // newTS = resp.data.track.timestamp;

        return findPositionFromUri(uri);
        // TODO: instead use find one and update
        // }
      })
      .then(data => {
        newPosition = data.index;

        if (newPosition === position) {
          // TODO: not this
          throw new Error('no need');
          // return;
        }

        return spotifyOffset({ locked: true });
      })
      // update spotify playlist with new track position
      .then(offset => {
        const range_start = offset + position;

        // insert before

        // plus 1 if downvote?
        let range_end = offset + newPosition;

        // TODO: why?
        if (change == -1) {
          range_end = range_end + 1;
        }

        return dispatch(reOrderTrackSpotify(range_start, range_end));
      })
      // track was updated in spotify and db successfully
      // -> display increase vote to user
      .then(data => {
        const payload = {
          insert_before: newPosition,
          range_start: position
        };
        return dispatch(
          sendSocketMessage({ type: 'REORDER_TRACK', payload: payload })
        );
        // }
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
        console.log('error adding vote', err);
      })
  );
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
      // if (resp.type === ADD_TRACK_TO_DB_SUCCESS) {
      return findPositionFromUri(uri);
      // }
    })
    .then(index => {
      // TODO: add offset
      // spotifyOffset()
      newPosition = index.index;

      return spotifyOffset({ locked: true });
    })
    .then(offset => {
      return dispatch(addToSpotifyPlaylist(uri, newPosition + offset));
    })
    .then(data => {
      // todo:  add updated at
      // if (data.type === ADD_TO_SPOTIFY_PLAYLIST_SUCCESS) {
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
      // }
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

export const removeTrackFromDb = (uri, position) => ({
  types: [
    'REMOVE_TRACK_FROM_DB',
    'REMOVE_TRACK_FROM_DB_SUCCESS',
    'REMOVE_TRACK_FROM_DB_FAILURE'
  ],
  callAPI: () => axios.delete(`/playlist/api/v1/tracks/${uri}`),
  payload: { position, uri }
});

export const removeTrackFromSpotifyPlaylist = (uri, position) => ({
  types: [REMOVE_TRACK, REMOVE_TRACK_SUCCESS, REMOVE_TRACK_FAILURE],
  callAPI: token =>
    spotifyApi(token).delete(`playlists/${playlistId}/tracks`, {
      data: {
        tracks: [{ uri }]
      }
    }),
  payload: { position }
});

export const removeTrack = (uri, position) => (dispatch, getState) => {
  console.log('remove track 2');

  // TODO - pass position instead of db look up
  let posFromDb;
  findPositionFromUri(uri)
    .then(index => {
      // TODO: add offset
      // spotifyOffset()
      posFromDb = index.index;

      return spotifyOffset({ locked: true });
    })
    .then(offset => {
      return dispatch(removeTrackFromSpotifyPlaylist(uri, offset + posFromDb));
    })
    .then(data => {
      // TODO: fix - add back in when store working
      // if (data.type === REMOVE_TRACK_SUCCESS) {

      // TODO: not doing locally
      return dispatch(removeTrackFromDb(uri, posFromDb)); //will remove locally too on REMOVE_TRACK_FROM_DB_SUCCESS
      // position === playble position
      // }//
    });
};

// export const removeTrack = (uri, position) => (dispatch, getState) => {
// dispatch(removeTrackFromSpotifyPlaylist(uri, position)).then(data => {
//   if (data.type === REMOVE_TRACK_SUCCESS) {
//     // To force refresh ?
//     return dispatch(decreaseVote(uri));
//   }
// });
// };
