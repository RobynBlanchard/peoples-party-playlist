import apiInstance from '../api';
import { INCREASE_VOTE, DECREASE_VOTE, MOVE_UP_PlAYLIST } from './types';

export const increaseVote = id => ({
  type: INCREASE_VOTE,
  payload: id
});

export const moveUp = (range_start, insert_before) => ({
  type: MOVE_UP_PlAYLIST,
  payload: {
    range_start,
    insert_before
  }
});

export const decreaseVote = id => ({
  type: DECREASE_VOTE,
  payload: id
});

const moveTrackUpPlaylist = (range_start, insert_before, id) => (
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
        dispatch(moveUp(range_start, insert_before));
        dispatch(increaseVote(id));
      })
      .catch(err => {
        console.log('no user id', err);
      });
  } else {
    console.log('moveTrackUpPlaylist failed, no token');
  }
};

const updatedTrackPosition = (
  position,
  currentPlaylist,
  allTracksAboveUpVotedTrack,
  upVotedTrackNumVotes
) => {
  for (let i in allTracksAboveUpVotedTrack) {
    const currentTrackVotes = allTracksAboveUpVotedTrack[i].votes;

    if (currentTrackVotes < upVotedTrackNumVotes) {
      return parseInt(i, 10);
    }
  }
  return position;
};

export const increaseVoteAndCheckForReOrder = (id, position) => (
  dispatch,
  getState
) => {
  const currentPlaylist = getState().playlists.playlistInfoWithVotes;
  const allTracksAboveUpVotedTrack = currentPlaylist.slice(0, position);
  const upVotedTrackNumVotes = currentPlaylist[position].votes + 1;

  const positionToMoveTo = updatedTrackPosition(
    position,
    currentPlaylist,
    allTracksAboveUpVotedTrack,
    upVotedTrackNumVotes
  );

  return dispatch(moveTrackUpPlaylist(position, positionToMoveTo, id));
};
