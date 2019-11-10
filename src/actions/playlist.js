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
} from './types';
import { upVoteLimit, downVoteLimit } from '../utils/constants';
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
import {
  spotifyOffSet,
  updatedTrackNewPosition,
  addToPlaylistApi,
  removeFromPlaylistApi
} from './playlistUtils';

export const upVoteLimitExceeded = position => ({
  type: 'UPVOTE_LIMIT_EXCEEDED',
  payload: position
});

export const downVoteLimitExceeded = position => ({
  type: 'DOWNVOTE_LIMIT_EXCEEDED',
  payload: position
});

export const updateTrackNumOfVotes = (uri, position, change) => (
  dispatch,
  getState
) => {
  const state = getState();
  const { userId } = state.appUser;
  const { tracks } = state.playlist;
  const selectedTrack = tracks[position];

  const votesByPerson = change - selectedTrack.votes;

  if (change - selectedTrack.votes > 0) {
    if (
      selectedTrack.upVoters &&
      selectedTrack.upVoters[userId] > upVoteLimit
    ) {
      return dispatch({ type: 'UPVOTE_LIMIT_EXCEEDED', payload: position });
    }
  } else {
    if (
      selectedTrack.downVoters &&
      selectedTrack.downVoters[userId] > downVoteLimit
    ) {
      return dispatch({ type: 'DOWNVOTE_LIMIT_EXCEEDED', payload: position });
    }
  }

  const updatedTrack = {
    ...selectedTrack,
    votes: change,
    updatedAt: new Date().toISOString(),
    upVoters: {
      ...selectedTrack.upVoters
    },
    downVoters: {
      ...selectedTrack.downVoters
    }
  };

  if (change - selectedTrack.votes > 0) {
    updatedTrack.upVoters[userId] =
      (updatedTrack.upVoters[userId] || 0) + votesByPerson;
  } else {
    updatedTrack.downVoters[userId] =
      (updatedTrack.downVoters[userId] || 0) - votesByPerson;
  }

  const newPosition = updatedTrackNewPosition(
    tracks,
    updatedTrack,
    votesByPerson
  );

  const callAPI = token => {
    if (newPosition === position) {
      return updateTrackDb(uri, {
        $set: {
          votes: change,
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
        votesByPerson,
        token
      ).then(res =>
        updateTrackDb(uri, {
          $set: { votes: change, updatedAt: updatedTrack.updatedAt }
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

  const newPosition = updatedTrackNewPosition(tracks, track, 1);
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
