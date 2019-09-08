import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  UPDATE_TRACK,
  UPDATE_TRACK_SUCCESS,
  UPDATE_TRACK_FAILURE,
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE,
  DELETE_TRACK,
  DELETE_TRACK_SUCCESS,
  DELETE_TRACK_FAILURE
} from './types';

import axios from 'axios';
import {
  reOrderTrackSpotify,
  addToSpotifyPlaylist,
  removeTrackFromSpotifyPlaylist
} from './apiSpotify';
import {
  updateTrack as updateTrackDb,
  addTrackToDb,
  removeTrackFromDb
} from './apiDb';
import { spotifyOffSet, updatedTrackPosition } from './playlistUtils';

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

      return reOrderTrackSpotify(
        position,
        newPosition,
        offset,
        change,
        token
      ).then(res =>
        updateTrackDb(uri, {
          $inc: { votes: change },
          $set: { updatedAt: updatedTrack.updatedAt }
        })
      );
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
    return addToSpotifyPlaylist(uri, newPosition + offset, token).then(res =>
      addTrackToDb(uri, name, artist, updatedAt)
    );
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

export const removeTrack = (uri, position) => (dispatch, getState) => {
  const callAPI = token => {
    return removeTrackFromSpotifyPlaylist(uri, token).then(res =>
      removeTrackFromDb(uri)
    );
  };
  return dispatch({
    types: [DELETE_TRACK, DELETE_TRACK_SUCCESS, DELETE_TRACK_FAILURE],
    requiresAuth: true,
    callAPI: token => callAPI(token),
    payload: {
      position: position,
      uri: uri
    }
  });
};
