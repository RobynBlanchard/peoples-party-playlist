import axios from 'axios';
import {
  START_SESSION,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE
} from '../types';
import { resumePlaybackSpotify, getCurrentlyPlayingSpotify } from '../playback';

import PollAPI from '../utils/pollAPI';

// TODO: - save session in db

// TODO: after fixing, change this to go via call api middleware
export const startSession = () => (dispatch, getState) => {
  const state = getState();
  const { tracks, lockedTrack, removedPlaylist } = state.playlist;
  const { progress_ms } = state.playback;
  const spotifyOffset = removedPlaylist.length;
  const { sessionStarted } = state.session;
  const token = getState().auth.token;

  // if nothing in locked already!

  PollAPI.setFn(
    () => getCurrentlyPlayingSpotify(token).then(res => {
      dispatch({
        type: 'GET_CURRENTLY_PLAYING_SUCCESS',
        payload: { response: res }
      });
    })
  );

  if (lockedTrack.length === 0) {
    return resumePlaybackSpotify(
      progress_ms,
      parseInt(spotifyOffset, 10),
      token
    )
      .then(res => {
        return axios.patch(`/api/v1/playlist/tracks/${tracks[0].uri}`, {
          update: { $set: { locked: true } }
        });
      })
      .then(res => {
        PollAPI.start();
        dispatch({ type: 'RESUME_PLAYBACK_SUCCESS' });
        dispatch({ type: 'START_SESSION_SUCCESS' });
      })
      .catch(error => {
        console.log('errrrr', error);
        // dispatch({ type: 'RESUME_PLAYBACK_SUCCESS' });
        return dispatch({
          payload: { error },
          type: 'RESUME_PLAYBACK_FAILURE'
        });
      });
  }

  return resumePlaybackSpotify(progress_ms, parseInt(spotifyOffset, 10), token)
    .then(res => {
      console.log('2222', getCurrentlyPlayingSpotify);

      // TODO: Pause interval when player is paused
      // setInterval(() => {
      //   console.log('djnfksdnjkfn');
      //   return getCurrentlyPlayingSpotify(token).then(res => {
      //     dispatch({
      //       type: 'GET_CURRENTLY_PLAYING_SUCCESS',
      //       payload: { response: res }
      //     });
      //   });
      // }, 1000);
      PollAPI.start();


      dispatch({ type: 'RESUME_PLAYBACK_SUCCESS' });
      dispatch({ type: 'START_SESSION_SUCCESS' });
    })
    .catch(error => {
      console.log('errrrr', error);
      // dispatch({ type: 'RESUME_PLAYBACK_SUCCESS' });
      return dispatch({
        payload: { error },
        type: 'RESUME_PLAYBACK_FAILURE'
      });
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
