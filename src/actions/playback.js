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
import { spotifyOffset } from './playlist';
import { updateTrack } from './playlist';

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

export const resumePlaybackSpotify = (playbackPosition, playlistIndex) => ({
  types: [RESUME_PLAYBACK, RESUME_PLAYBACK_SUCCESS, RESUME_PLAYBACK_FAILURE],
  callAPI: token =>
    spotifyApi(token).put('me/player/play', {
      context_uri: `spotify:playlist:${playlistId}`,
      offset: { position: playlistIndex },
      position_ms: playbackPosition
    })
});

export const resumePlayback = () => (dispatch, getState) => {
  const state = getState();
  const playbackPosition = state.playback.progress_ms;
  const sessionStarted = state.session.sessionStarted;

  if (sessionStarted) {
    const query = { removed: true };

    spotifyOffset(query).then(offset => {
      dispatch(resumePlaybackSpotify(playbackPosition, offset));
    });
  } else {
    const playlist = state.playlists.playablePlaylist;

    dispatch(sendSocketMessage(startSession()));
    const query = { removed: true };

    spotifyOffset(query).then(offset => {
      dispatch(resumePlaybackSpotify(playbackPosition, offset)).then(res => {
        if (res && res.type === 'RESUME_PLAYBACK_SUCCESS') {
          dispatch(
            updateTrack(playlist[0].uri, {
              $set: { locked: true }
            })
          );
        }
      });
    });
  }
};

export const pausePlayback = () => ({
  types: [PAUSE_PLAYBACK, PAUSE_PLAYBACK_SUCCESS, PAUSE_PLAYBACK_FAILURE],
  callAPI: token => spotifyApi(token).put('me/player/pause')
});

export const getCurrentlyPlayingTrackSpotify = () => ({
  types: [
    GET_CURRENTLY_PLAYING,
    GET_CURRENTLY_PLAYING_SUCCESS,
    GET_CURRENTLY_PLAYING_FAILURE
  ],
  callAPI: token => spotifyApi(token).get('me/player/currently-playing')
});

export const getCurrentlyPlayingTrack = () => (dispatch, getState) => {
  const state = getState();
  const previouslyPlayingTrack = state.playback.currentTrack.uri;

  dispatch(getCurrentlyPlayingTrackSpotify()).then(action => {
    if (action.type === 'GET_CURRENTLY_PLAYING_SUCCESS') {
      const currentlyPlayingTrack = action.payload.response.data.item.uri;

      if (currentlyPlayingTrack && previouslyPlayingTrack) {
        if (previouslyPlayingTrack !== currentlyPlayingTrack) {
          dispatch(
            updateTrack(previouslyPlayingTrack, {
              $set: { removed: true }
            })
          );
          dispatch(
            updateTrack(currentlyPlayingTrack, { $set: { locked: true } })
          );
        }
      }
    }
  });
};
