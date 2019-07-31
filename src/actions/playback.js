import {
  START_SESSION,
  RESUME_PLAYBACK,
  RESUME_PLAYBACK_SUCCESS,
  RESUME_PLAYBACK_FAILURE,
  PAUSE_PLAYBACK,
  PAUSE_PLAYBACK_SUCCESS,
  PAUSE_PLAYBACK_FAILURE,
  GET_CURRENTLY_PLAYING,
  GET_CURRENTLY_PLAYING_SUCCESS,
  GET_CURRENTLY_PLAYING_FAILURE
} from './types';
import spotifyApi from '../api';
import { playlistId } from '../utils/constants';

export const startSession = () => {
  return {
    type: START_SESSION,
    payload: true
  };
};

function sendSocketMessage(action) {
  return {
    handler: 'WS',
    ...action
  };
}

export const resumePlaybackSpotify = playbackPosition => ({
  types: [RESUME_PLAYBACK, RESUME_PLAYBACK_SUCCESS, RESUME_PLAYBACK_FAILURE],
  callAPI: token =>
    spotifyApi(token).put('me/player/play', {
      context_uri: `spotify:playlist:${playlistId}`,
      offset: { position: 0 },
      position_ms: playbackPosition
    }),
  // wsHandler: [RESUME_PLAYBACK_SUCCESS, RESUME_PLAYBACK_FAILURE]
});

export const resumePlayback = () => (dispatch, getState) => {
  console.log('RESUME PLAYBACK')
  const playbackPosition = getState().playback.currentTrack.progress_ms;
  dispatch(resumePlaybackSpotify(playbackPosition)).then(data => {
    if (!getState().session.sessionStarted) {
      dispatch(sendSocketMessage(startSession()));
    }
  });
};
export const pausePlayback = () => ({
  types: [PAUSE_PLAYBACK, PAUSE_PLAYBACK_SUCCESS, PAUSE_PLAYBACK_FAILURE],
  callAPI: token => spotifyApi(token).put('me/player/pause')
});

export const getCurrentlyPlayingTrack = () => ({
  types: [
    GET_CURRENTLY_PLAYING,
    GET_CURRENTLY_PLAYING_SUCCESS,
    GET_CURRENTLY_PLAYING_FAILURE
  ],
  callAPI: token => spotifyApi(token).get('me/player/currently-playing')
});
