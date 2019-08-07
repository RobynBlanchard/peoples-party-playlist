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
  const playbackPosition = getState().playback.progress_ms;

  if (!getState().session.sessionStarted) {
    const playlist = getState().playlists.playablePlaylist;

    dispatch(sendSocketMessage(startSession()));
    // const query = {locked: true}
    const query = { removed: true };

    spotifyOffset(query).then(offset => {
      dispatch(resumePlaybackSpotify(playbackPosition, offset)).then(res => {
        dispatch(
          updateTrack(playlist[0].uri, {
            $set: { locked: true }
          })
        );
      });
    });
  } else {
    const query = { removed: true };

    spotifyOffset(query).then(offset => {
      dispatch(resumePlaybackSpotify(playbackPosition, offset));
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
  dispatch(getCurrentlyPlayingTrackSpotify()).then(action => {
    const curPlaying = action.payload.response.data.item;
    if (action.type === 'GET_CURRENTLY_PLAYING_SUCCESS') {
      // TODO: if item is null then alert / log
      if (curPlaying) {
        const state = getState();
        const currentlyPlayingTrack = curPlaying.uri;
        const previousCurrentlyPlayingTrack = state.playback.currentTrack.uri;

        if (previousCurrentlyPlayingTrack) {
          if (previousCurrentlyPlayingTrack !== currentlyPlayingTrack) {
            dispatch(
              updateTrack(previousCurrentlyPlayingTrack, {
                $set: { removed: true }
              })
            );
            dispatch(
              updateTrack(currentlyPlayingTrack, { $set: { locked: true } })
            );
          }
          // TODO: remove locally
        }
      }
    }
  });
};
