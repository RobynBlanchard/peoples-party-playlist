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
import { debug } from 'util';

function sendSocketMessage(action) {
  return {
    handler: 'WS',
    ...action
  };
}

const spotifyOffSet = (removedPlaylist, lockedTrack) => {
  return removedPlaylist.length + lockedTrack.length;
};


export const updateTrackNumOfVotes = (uri, position, change) => (
  dispatch,
  getState
) => {
  const playlists = getState().playlists;
  const currentPlaylist = playlists.playablePlaylist;
  const selectedTrack = currentPlaylist[position];

  const updatedAt = new Date().toISOString();
  const updatedTrack = {
    ...selectedTrack,
    votes: selectedTrack.votes + change,
    updatedAt: updatedAt
  };

  let newPosition = currentPlaylist.findIndex(el => {
    return el.votes < updatedTrack.votes
  })

  if (newPosition === -1) {
    newPosition = currentPlaylist.length - 1
  } else  {
    if (change === -1) {
      // don't include track itself when working out position
      newPosition -= 1
    }
  }

  if (newPosition === position) {
    return dispatch(
      updateTrack(uri, {
        $inc: { votes: change },
        $set: { updatedAt: updatedAt }
      })
    ).then(res => {
      if (res.type === 'UPDATE_TRACK_IN_DB_SUCCESS') {
        dispatch({
          type: 'UPDATE_TRACK',
          payload: {
            position,
            newPosition,
            track: updatedTrack,
          }
        });
      }
    });
  } else {
    const offset = spotifyOffSet(
      playlists.removedPlaylist,
      playlists.lockedTrack
    );

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
              $set: { updatedAt: updatedAt }
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
              track: updatedTrack,
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

  let newPosition = currentPlaylist.findIndex(el => {
    el.votes < track.votes;
  })

  if (newPosition === -1) {
    newPosition = currentPlaylist.length
  }

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
