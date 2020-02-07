import axios from 'axios';
import { resumePlaybackSpotify, getCurrentlyPlayingSpotify } from '../playback';

import PollAPI from '../utils/pollAPI';

// TODO: - save playing in db to persist over refresh

// TODO: after fixing, change this to go via call api middleware
export const startSession = () => (dispatch, getState) => {
  const state = getState();
  const { tracks, lockedTrack, removedPlaylist } = state.playlist;
  const { progress_ms } = state.playback;
  const spotifyOffset = removedPlaylist.length;
  const token = getState().auth.token;

  PollAPI.setFn(() =>
    getCurrentlyPlayingSpotify(token).then(res => {
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
      })
      .catch(error => {
        return dispatch({
          payload: { error },
          type: 'RESUME_PLAYBACK_FAILURE'
        });
      });
  }

  return resumePlaybackSpotify(progress_ms, parseInt(spotifyOffset, 10), token)
    .then(res => {
      PollAPI.start();

      dispatch({ type: 'RESUME_PLAYBACK_SUCCESS' });
    })
    .catch(error => {
      return dispatch({
        payload: { error },
        type: 'RESUME_PLAYBACK_FAILURE'
      });
    });
};
