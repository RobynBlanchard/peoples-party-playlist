import axios from 'axios';
import {
  START_SESSION,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE
} from '../types';
import { resumePlaybackSpotify } from '../playback';

// TODO: - save session in db
export const startSession = () => (dispatch, getState) => {
  const state = getState();
  const { tracks, lockedTrack, removedPlaylist } = state.playlist;
  const { progress_ms } = state.playback;
  const spotifyOffset = removedPlaylist.length;
  const { sessionStarted } = state.session;
  const token = getState().auth.token;

  // if nothing in locked already!

  if (lockedTrack.length === 0) {
    return resumePlaybackSpotify(progress_ms, parseInt(spotifyOffset, 10), token).then(
      res => {
        return axios.patch(`/api/v1/playlist/tracks/${tracks[0].uri}`, {
          update: { $set: { locked: true } }
        });
      }
    ).then(res => {
      dispatch({ type: 'RESUME_PLAYBACK_SUCCESS'});
      dispatch({type: 'START_SESSION_SUCCESS'})
    })
  };

  return resumePlaybackSpotify(progress_ms, parseInt(spotifyOffset, 10), token).then(res => {
    dispatch({ type: 'RESUME_PLAYBACK_SUCCESS'});
    dispatch({type: 'START_SESSION_SUCCESS'})
  });

  // return dispatch({
  //   types: [START_SESSION, START_SESSION_SUCCESS, START_SESSION_FAILURE],
  //   callAPI: () =>
  //     axios.patch(`/api/v1/playlist/tracks/${tracks[0].uri}`, {
  //       update: { $set: { locked: true } }
  //     })
  // });
  // axios.patch(`/api/v1/playlist/tracks/${tracks[0].uri}`, {
  //   update: { $set: { locked: true } }
  // })
  // }
  // return dispatch({
  //   type: START_SESSION_SUCCESS
  // });
};
