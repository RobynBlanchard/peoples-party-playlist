import apiInstance from '../api';
import {
  INCREASE_VOTE,
  DECREASE_VOTE,
  MOVE_UP_PlAYLIST,
  MOVE_DOWN_PlAYLIST,
  REMOVE_FROM_PLAYLIST
} from './types';

export const increaseVote = id => ({
  type: INCREASE_VOTE,
  payload: id
});

export const decreaseVote = id => ({
  type: DECREASE_VOTE,
  payload: id
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

// rename as used for moving up and down
const reOrderPlaylist = (range_start, insert_before, id, action) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;

  if (token) {
    return apiInstance(token)
      .put(`playlists/1OZWEFHDuPYYuvjCVhryXV/tracks`, {
        range_start,
        insert_before
      })
      .then(data => {
        if (action === 'up') {
          dispatch(moveUp(range_start, insert_before));
          dispatch(increaseVote(id));
        } else {
          dispatch(moveDown(range_start, insert_before));
          dispatch(decreaseVote(id));
        }
      })
      .catch(err => {
        console.log('no user id', err);
      });
  } else {
    console.log(`move track ${action} the playlist failed, no token`);
  }
};

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

export const increaseVoteAndCheckForReOrder = (id, position) => (
  dispatch,
  getState
) => {
  const currentPlaylist = getState().playlists.playlist;
  const topMoveablePosition = getState().session.sessionStarted ? 1 : 0
  const allTracksAboveUpVotedTrack = currentPlaylist.slice(topMoveablePosition, position);
  const upVotedTrackNumVotes = currentPlaylist[position].votes + 1;

  const positionToMoveTo = updatedTrackPosition(
    position,
    allTracksAboveUpVotedTrack,
    upVotedTrackNumVotes,
    topMoveablePosition
  );

  return dispatch(reOrderPlaylist(position, positionToMoveTo, id, 'up'));
};

const updatedTrackPositionForDownVote = (
  position,
  allTracksBelowDownVotedTrack,
  downVotedTrackNumVotes
) => {
  for (let i in allTracksBelowDownVotedTrack) {
    const currentTrackVotes = allTracksBelowDownVotedTrack[i].votes;

    // downvoted track has more votes than next one
    if (currentTrackVotes <= downVotedTrackNumVotes) {
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

export const decreaseVoteAndCheckForReOrder = (id, position, uri) => (
  dispatch,
  getState
) => {
  debugger;
  const currentPlaylist = getState().playlists.playlist;
  const allTracksBelowDownVotedTrack = currentPlaylist.slice(
    position + 1,
    currentPlaylist.length
  );
  const downVotedTrackNumVotes = currentPlaylist[position].votes - 1;

  // could move check for -5 to component
  if (downVotedTrackNumVotes === -5) {
    return dispatch(removeTrack(uri, id, position));
  }

  const positionToMoveTo = updatedTrackPositionForDownVote(
    position,
    allTracksBelowDownVotedTrack,
    downVotedTrackNumVotes
  );

  return dispatch(reOrderPlaylist(position, positionToMoveTo, id, 'down'));
};

const removeTrack = (uri, id, position) => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    return (
      apiInstance(token)
        // TODO pass in playlist uri
        .delete(`playlists/1OZWEFHDuPYYuvjCVhryXV/tracks`, {
          data: {
            tracks: [{ uri }]
          }
        })
        .then(data => {
          dispatch(removeFromPlaylist(position));
          return dispatch(decreaseVote(id));
        })
        .catch(err => {
          debugger;
          console.log('no user id', err);
        })
    );
  } else {
    debugger;
    console.log(`remove track failed`);
  }
};

export const addToPlaylist = (uri) => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    return (
      apiInstance(token)
        .post(`playlists/1OZWEFHDuPYYuvjCVhryXV/tracks?uris=${uri}`)
        .then(data => {
          console.log('data');
          // dispatch(dispatchAddToPlaylst(position));
          // return dispatch(decreaseVote(id));
        })
        .catch(err => {
          console.log('no user id', err);
        })
    );
  } else {
    debugger;
    console.log(`add to playlist failed`);
  }
};
