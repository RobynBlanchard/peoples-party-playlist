import {
  UPDATE_TRACK,
  UPDATE_TRACK_SUCCESS,
  UPDATE_TRACK_FAILURE,
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE,
  DELETE_TRACK,
  DELETE_TRACK_SUCCESS,
  DELETE_TRACK_FAILURE,
  ADD_TO_PLAYLIST_DISALLOWED,
} from './types';

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
  const state = getState();
  const { userId } = state.appUser;
  const { playablePlaylist } = state.playlist;
  const selectedTrack = playablePlaylist[position];

  if (change === 1) {
    if (selectedTrack.upVoters && selectedTrack.upVoters[userId] === 3) {
      return dispatch({ type: 'UPVOTE_LIMIT_EXCEEDED', payload: position });
    }
  } else {

    if (selectedTrack.downVoters && selectedTrack.downVoters[userId] === 2) {
      return dispatch({ type: 'DOWNVOTE_LIMIT_EXCEEDED', payload: position });
    }
  }

  const updatedTrack = {
    ...selectedTrack,
    votes: selectedTrack.votes + change,
    updatedAt: new Date().toISOString(),
    upVoters: {
      ...selectedTrack.upVoters
    },
    downVoters: {
      ...selectedTrack.downVoters
    }
  };

  if (change === 1) {
    updatedTrack.upVoters[userId] = (updatedTrack.upVoters[userId] || 0) + 1;
  } else {
    updatedTrack.downVoters[userId] =
      (updatedTrack.downVoters[userId] || 0) + 1;
  }

  const newPosition = updatedTrackPosition(
    playablePlaylist,
    updatedTrack,
    change
  );

  const callAPI = token => {
    if (newPosition === position) {
      return updateTrackDb(uri, {
        $inc: { votes: change },
        $set: {
          updatedAt: updatedTrack.updatedAt,
          upVoters: updatedTrack.upVoters,
          downVoters: updatedTrack.downVoters
        }
      });
    } else {
      const { removedPlaylist, lockedTrack } = getState().playlist;
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

export const addToPlaylist = (uri, name, artist, positionInSearch) => (
  dispatch,
  getState
) => {
  const {
    playablePlaylist,
    removedPlaylist,
    lockedTrack
  } = getState().playlist;

  const alreadyAdded = playablePlaylist.some(track => track.uri === uri);
  if (alreadyAdded) {
    return dispatch({
      type: ADD_TO_PLAYLIST_DISALLOWED,
      payload: positionInSearch,
    })
  }

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
      positionInSearch: positionInSearch,
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
