import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  UPDATE_TRACK,
  UPDATE_TRACK_SUCCESS,
  UPDATE_TRACK_FAILURE,
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE
} from './types';

import axios from 'axios';
import {
  reOrderTrackSpotify,
  addToSpotifyPlaylist,
  removeTrackFromSpotifyPlaylist
} from './apiSpotify';
import { updateTrack as updateTrackDb, addTrackToDb } from './apiDb';
import { spotifyOffSet, updatedTrackPosition } from './playlistUtils';

const sendSocketMessage = action => {
  return {
    handler: 'WS',
    ...action
  };
};

export const updateTrackNumOfVotes = (uri, position, change) => (
  dispatch,
  getState
) => {
  const { playablePlaylist } = getState().playlists;
  const selectedTrack = playablePlaylist[position];

  const updatedTrack = {
    ...selectedTrack,
    votes: selectedTrack.votes + change,
    updatedAt: new Date().toISOString()
  };

  const newPosition = updatedTrackPosition(
    playablePlaylist,
    updatedTrack,
    change
  );

  const callAPI = token => {
    if (newPosition === position) {
      return updateTrackDb(uri, {
        $inc: { votes: change },
        $set: { updatedAt: updatedTrack.updatedAt }
      });
    } else {
      const { removedPlaylist, lockedTrack } = getState().playlists;
      const offset = spotifyOffSet(removedPlaylist, lockedTrack);

      return Promise.all([
        reOrderTrackSpotify(position, newPosition, offset, change, token),
        updateTrackDb(uri, {
          $inc: { votes: change },
          $set: { updatedAt: updatedTrack.updatedAt }
        })
      ]);
    }
  };

  return dispatch({
    types: [UPDATE_TRACK, UPDATE_TRACK_SUCCESS, UPDATE_TRACK_FAILURE],
    requiresAuth: true,
    callAPI: token => callAPI(token),
    payload: {
      position,
      newPosition,
      track: updatedTrack
    }
  });
};

export const addToPlaylist = (uri, name, artist) => (dispatch, getState) => {
  const {
    playablePlaylist,
    removedPlaylist,
    lockedTrack
  } = getState().playlists;

  const updatedAt = new Date().toISOString();
  const track = {
    artist,
    name,
    votes: 0,
    uri,
    updatedAt
  };

  const newPosition = updatedTrackPosition(playablePlaylist, track, 1);
  const offset = spotifyOffSet(removedPlaylist, lockedTrack);

  const callAPI = token => {
    return Promise.all([
      addToSpotifyPlaylist(uri, newPosition + offset, token),
      addTrackToDb(uri, name, artist, updatedAt)
    ]);
  };

  return dispatch({
    types: [ADD_TO_PLAYLIST, ADD_TO_PLAYLIST_SUCCESS, ADD_TO_PLAYLIST_FAILURE],
    requiresAuth: true,
    callAPI: token => callAPI(token),
    payload: {
      position: newPosition,
      track: track
    }
  });
};

// export const removeTrack = (uri, position) => (dispatch, getState) => {
//   console.log('remove track 2');

//   // TODO - pass position instead of db look up
//   let posFromDb;
//   findPositionFromUri(uri)
//     .then(index => {
//       // TODO: add offset
//       // spotifyOffset()
//       posFromDb = index.index;

//       return spotifyOffset({ locked: true });
//     })
//     .then(offset => {
//       return dispatch(removeTrackFromSpotifyPlaylist(uri, offset + posFromDb));
//     })
//     .then(data => {
//       // TODO: fix - add back in when store working
//       // if (data.type === REMOVE_TRACK_SUCCESS) {

//       // TODO: not doing locally
//       return dispatch(removeTrackFromDb(uri, posFromDb)); //will remove locally too on REMOVE_TRACK_FROM_DB_SUCCESS
//       // position === playble position
//       // }//
//     });
// };
