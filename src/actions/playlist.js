import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  INCREASE_VOTE,
  DECREASE_VOTE,
  REORDER_TRACK,
  REORDER_TRACK_SUCCESS,
  REORDER_TRACK_FAILURE,
  MOVE_UP_PlAYLIST,
  MOVE_DOWN_PlAYLIST,
  REMOVE_FROM_PLAYLIST,
  REMOVE_TRACK,
  REMOVE_TRACK_SUCCESS,
  REMOVE_TRACK_FAILURE
} from './types';

import axios from 'axios';

export const increaseVote = uri => ({
  type: INCREASE_VOTE,
  payload: uri
});

export const decreaseVote = uri => ({
  type: DECREASE_VOTE,
  payload: uri
});

export const moveUp = (range_start, insert_before) => ({
  type: MOVE_UP_PlAYLIST,
  payload: {
    range_start,
    insert_before
  }
});

export const moveDown = (range_start, insert_before) => ({
  type: MOVE_DOWN_PlAYLIST,
  payload: {
    range_start,
    insert_before
  }
});

export const removeFromPlaylist = position => ({
  type: REMOVE_FROM_PLAYLIST,
  payload: position
});

export const reOrderTrack = (range_start, insert_before) => ({
  types: [REORDER_TRACK, REORDER_TRACK_SUCCESS, REORDER_TRACK_FAILURE],
  callAPI: token =>
    spotifyApi(token).put(`playlists/${playlistId}/tracks`, {
      range_start,
      insert_before
    }),
  payload: { range_start, insert_before }
});

const updatedTrackPosition = (
  position,
  allTracksAboveUpVotedTrack,
  upVotedTrackNumVotes,
  topMoveablePosition
) => {
  for (let i in allTracksAboveUpVotedTrack) {
    const currentTrackVotes = allTracksAboveUpVotedTrack[i].votes;

    if (currentTrackVotes < upVotedTrackNumVotes) {
      return parseInt(i, 10) + topMoveablePosition;
    }
  }
  return position;
};

const positionToMoveTo = (playlist, sessionStarted, position) => {
  const topMoveablePosition = sessionStarted ? 1 : 0;
  const allTracksAboveUpVotedTrack = playlist.slice(
    topMoveablePosition,
    position
  );
  const upVotedTrackNumVotes = playlist[position].votes + 1;

  return updatedTrackPosition(
    position,
    allTracksAboveUpVotedTrack,
    upVotedTrackNumVotes,
    topMoveablePosition
  );
};

export const handleVoteIncrease = (uri, position) => (dispatch, getState) => {
  const playlist = getState().playlists.playlist;
  const sessionStarted = getState().session.sessionStarted;

  const newPosition = positionToMoveTo(playlist, sessionStarted, position);

  dispatch(reOrderTrack(position, newPosition)).then(data => {
    if (data.type === REORDER_TRACK_SUCCESS) {
      return dispatch(increaseVote(uri));
    }
  });
};

const updatedTrackPositionForDownVote = (
  position,
  allTracksBelowDownVotedTrack,
  newNumberOfVotes
) => {
  for (let i in allTracksBelowDownVotedTrack) {
    const currentTrackVotes = allTracksBelowDownVotedTrack[i].votes;

    // downvoted track has more votes than next one
    if (currentTrackVotes <= newNumberOfVotes) {
      return parseInt(i, 10) + position;
    }

    // end of playlist
    if (parseInt(i, 10) === allTracksBelowDownVotedTrack.length - 1) {
      return parseInt(i, 10) + position + 1;
    }
  }
  // track downvoted was already the last one on the playlist
  return position;
};

export const handleVoteDecrease = (uri, position) => (dispatch, getState) => {
  const currentPlaylist = getState().playlists.playlist;
  const allTracksBelowDownVotedTrack = currentPlaylist.slice(
    position + 1,
    currentPlaylist.length
  );
  const newNumberOfVotes = currentPlaylist[position].votes - 1;

  // could move check for -5 to component
  if (newNumberOfVotes === -5) {
    return dispatch(removeTrack(uri, position));
  }

  const positionToMoveTo = updatedTrackPositionForDownVote(
    position,
    allTracksBelowDownVotedTrack,
    newNumberOfVotes
  );
  dispatch(reOrderTrack(position, positionToMoveTo)).then(data => {
    if (data.type === REORDER_TRACK_SUCCESS) {
      return dispatch(decreaseVote(uri));
    }
  });
};

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
  dispatch(removeTrackFromSpotifyPlaylist(uri, position)).then(data => {
    if (data.type === REMOVE_TRACK_SUCCESS) {
      // To force refresh ?
      return dispatch(decreaseVote(uri));
    }
  });
};

export const addToSpotifyPlaylist = (uri, position, details) => ({
  types: [
    'ADD_TO_PLAYLIST',
    'ADD_TO_PLAYLIST_SUCCESS',
    'ADD_TO_PLAYLIST_FAILURE'
  ],
  callAPI: token =>
    spotifyApi(token).post(
      `playlists/${playlistId}/tracks?uris=${uri}&position=${position}`
    ),
  payload: {
    position,
    details
  }
});

export const addToPlaylist = (uri, name, artist) => (dispatch, getState) => {
  const playlist = getState().playlists.playlist;

  const trackFoundInPlaylist = playlist.findIndex(el => el.uri === uri);
  if (trackFoundInPlaylist === -1) {
    const positionToMoveTo = (playlist, votes) => {
      let position = 0;

      const len = playlist.length;

      if (len > 0) {
        for (let i = 0; i < len; i++) {
          if (playlist[len - 1 - i].votes >= votes) {
            position = len - i;
            return position;
          }
        }
      }
      return position;
    };
    const newPositionn = positionToMoveTo(playlist, 0);
    const details = {
      uri: uri,
      votes: 0,
      name: name,
      artist: artist
    };
    // return dispatch(addToSpotifyPlaylist(uri, newPositionn, details));

    return dispatch(addToSpotifyPlaylist(uri, newPositionn, details)).then(data => {
      if (data.type === 'ADD_TO_PLAYLIST_SUCCESS') {
        console.log('uri', uri)
        return axios.post('/add-to-playlist', {
          uri
        })
      }
    });
  }

  alert('Track already on playlist');

  return dispatch({
    type: 'ADD_TO_PLAYLIST_FAILURE',
    payload: 'Track already on playlist',
  })
};
