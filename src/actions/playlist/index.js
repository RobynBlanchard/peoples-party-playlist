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
  ADD_TO_PLAYLIST_DISALLOWED
} from '../types';
import {
  spotifyOffSet,
  updatedTrackNewPosition,
  addToPlaylistApi,
  removeFromPlaylistApi,
  updateTrackApi,
  updatedTrackVotes
} from '../utils/playlistUtils';

export const upVoteLimitExceeded = position => ({
  type: 'UPVOTE_LIMIT_EXCEEDED',
  payload: position
});

export const downVoteLimitExceeded = position => ({
  type: 'DOWNVOTE_LIMIT_EXCEEDED',
  payload: position
});

export const updateTrackNumOfVotes = (position, newVotes) => (
  dispatch,
  getState
) => {
  const state = getState();
  const { userId } = state.appUser;
  const { tracks, removedPlaylist, lockedTrack } = state.playlist;

  const selectedTrack = tracks[position];

  const votesByUser = newVotes - selectedTrack.votes;
  const updatedTrack = updatedTrackVotes(
    selectedTrack,
    newVotes,
    votesByUser,
    userId
  );

  const newPosition = updatedTrackNewPosition(tracks, updatedTrack, votesByUser);
  const offset = spotifyOffSet(removedPlaylist, lockedTrack);

  return dispatch({
    types: [UPDATE_TRACK, UPDATE_TRACK_SUCCESS, UPDATE_TRACK_FAILURE],
    requiresAuth: true,
    callAPI: token =>
      updateTrackApi(token, position, newPosition, updatedTrack, offset),
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
  const { tracks, removedPlaylist, lockedTrack } = getState().playlist;

  const alreadyAdded = tracks.some(track => track.uri === uri);
  if (alreadyAdded) {
    return dispatch({
      type: ADD_TO_PLAYLIST_DISALLOWED,
      payload: positionInSearch
    });
  }

  const updatedAt = new Date().toISOString();
  const track = {
    artist,
    name,
    votes: 0,
    uri,
    updatedAt
  };

  const addToPlaylistIncrement = 1;
  const newPosition = updatedTrackNewPosition(
    tracks,
    track,
    addToPlaylistIncrement
  );
  const offset = spotifyOffSet(removedPlaylist, lockedTrack);

  return dispatch({
    types: [ADD_TO_PLAYLIST, ADD_TO_PLAYLIST_SUCCESS, ADD_TO_PLAYLIST_FAILURE],
    requiresAuth: true,
    callAPI: token => addToPlaylistApi(token, newPosition + offset, track),
    payload: {
      position: newPosition,
      positionInSearch: positionInSearch,
      track: track
    }
  });
};

export const removeTrack = (uri, position) => dispatch =>
  dispatch({
    types: [DELETE_TRACK, DELETE_TRACK_SUCCESS, DELETE_TRACK_FAILURE],
    requiresAuth: true,
    callAPI: token => removeFromPlaylistApi(token, uri),
    payload: {
      position: position,
      uri: uri
    }
  });
