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
import {
  reOrderTrackSpotify,
  addToSpotifyPlaylist,
  removeTrackFromSpotifyPlaylist
} from './apiSpotify';
import { updateTrack, addTrackToDb } from './apiDb';
import { spotifyOffSet, updatedTrackPosition } from './playlistUtils';

function sendSocketMessage(action) {
  return {
    handler: 'WS',
    ...action
  };
}

// const updateTrackInDbAndLocally = () => {

// }

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

  if (newPosition === position) {
    return dispatch(
      updateTrack(uri, {
        $inc: { votes: change },
        $set: { updatedAt: updatedTrack.updatedAt }
      })
    ).then(res => {
      // move to reducer?
      if (res.type === 'UPDATE_TRACK_IN_DB_SUCCESS') {
        dispatch({
          type: 'UPDATE_TRACK',
          payload: {
            position,
            newPosition,
            track: updatedTrack
          }
        });
      }
    });
  } else {
    const { removedPlaylist, lockedTrack } = getState().playlists;
    const offset = spotifyOffSet(removedPlaylist, lockedTrack);

    const range_start = offset + position;
    let insert_before = offset + newPosition;
    if (change == -1) {
      insert_before = insert_before + 1;
    }

    return dispatch(reOrderTrackSpotify(range_start, insert_before))
      .then(res => {
        if (res.type === 'REORDER_TRACK_SPOTIFY_SUCCESS') {
          return dispatch(
            updateTrack(uri, {
              $inc: { votes: change },
              $set: { updatedAt: updatedTrack.updatedAt }
            })
          );
        }
      })
      .then(res => {
        if (res.type === 'UPDATE_TRACK_IN_DB_SUCCESS') {
          dispatch({
            type: 'UPDATE_TRACK',
            payload: {
              position,
              newPosition,
              track: updatedTrack
            }
          });
        }
      });
  }
};

export const addToPlaylist = (uri, name, artist) => (dispatch, getState) => {
  let currentPlaylist = getState().playlists.playablePlaylist;

  const updatedAt = new Date().toISOString();
  const track = {
    artist,
    name,
    votes: 0,
    uri,
    updatedAt
  };

  let newPosition = updatedTrackPosition(currentPlaylist, updatedTrack, 1);

  const removedPlaylist = getState().playlists.removedPlaylist;
  const lockedTrack = getState().playlists.lockedTrack;

  const spotifyOffset = removedPlaylist.length + lockedTrack.length;

  dispatch(addToSpotifyPlaylist(uri, newPosition + spotifyOffset))
    .then(res => {
      if (res.type === ADD_TO_SPOTIFY_PLAYLIST_SUCCESS) {
        return dispatch(addTrackToDb(uri, name, artist, updatedAt));
      }
    })
    .then(res => {
      if (res.type === 'ADD_TRACK_TO_DB_SUCCESS') {
        const payload = {
          position: newPosition,
          track: track
        };
        return dispatch(
          sendSocketMessage({ type: ADD_TO_PLAYLIST, payload: payload })
        );
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
