import {
  UPDATE_CURRENT_TRACK,
  UPDATE_CURRENT_TRACK_SUCCESS,
  UPDATE_CURRENT_TRACK_FAILURE,
  GET_CURRENTLY_PLAYING,
  GET_CURRENTLY_PLAYING_SUCCESS,
  GET_CURRENTLY_PLAYING_FAILURE,
  RESUME_PLAYBACK,
  RESUME_PLAYBACK_SUCCESS,
  RESUME_PLAYBACK_FAILURE,
  PAUSE_PLAYBACK,
  PAUSE_PLAYBACK_SUCCESS,
  PAUSE_PLAYBACK_FAILURE
} from '../types';
import spotifyApi from '../utils/api';
import { playlistId } from'../../utils/constants';
import { updateTrackDb } from '../utils/apiDb';
import { startSession } from '../session';

const resumePlaybackSpotify = (playbackPosition, playlistIndex, token) => {
  return spotifyApi(token).put('me/player/play', {
    context_uri: `spotify:playlist:${playlistId}`,
    offset: { position: playlistIndex },
    position_ms: playbackPosition
  });
};

export const resumePlayback = () => (dispatch, getState) => {
  const state = getState();
  const { progress_ms } = state.playback;
  const { removedPlaylist, lockedTrack, tracks } = state.playlist;
  const spotifyOffset = removedPlaylist.length;
  const { sessionStarted } = state.session;
  const callAPI = token =>
    resumePlaybackSpotify(progress_ms, parseInt(spotifyOffset, 10), token).then(
      res => {
        // if (!sessionStarted) dispatch(startSession())
        if (lockedTrack.length === 0 && tracks.length > 0) {
          dispatch(startSession());
        }
      }
    );

  dispatch({
    types: [RESUME_PLAYBACK, RESUME_PLAYBACK_SUCCESS, RESUME_PLAYBACK_FAILURE],
    callAPI: callAPI,
    requiresAuth: true
  });
};

export const pausePlayback = () => ({
  types: [PAUSE_PLAYBACK, PAUSE_PLAYBACK_SUCCESS, PAUSE_PLAYBACK_FAILURE],
  callAPI: token => spotifyApi(token).put('me/player/pause'),
  requiresAuth: true
});

export const getCurrentlyPlayingTrack = () => ({
  types: [
    GET_CURRENTLY_PLAYING,
    GET_CURRENTLY_PLAYING_SUCCESS,
    GET_CURRENTLY_PLAYING_FAILURE
  ],
  callAPI: token => spotifyApi(token).get('me/player/currently-playing'),
  requiresAuth: true
});

const updateCurrentTrackInDb = (
  previouslyPlayingTrack,
  currentlyPlayingTrack
) =>
  Promise.all([
    updateTrackDb(previouslyPlayingTrack, {
      $set: { removed: true }
    }),
    updateTrackDb(currentlyPlayingTrack, { $set: { locked: true } })
  ]);

export const updateCurrentTrack = () => (dispatch, getState) => {
  // debugger
  const state = getState();
  const currentlyPlayingTrack = state.playback.currentTrack.uri;
  const previouslyPlayingTrack = state.playlist.lockedTrack[0].uri;

  dispatch({
    types: [
      UPDATE_CURRENT_TRACK,
      UPDATE_CURRENT_TRACK_SUCCESS,
      UPDATE_CURRENT_TRACK_FAILURE
    ],
    callAPI: () =>
      updateCurrentTrackInDb(previouslyPlayingTrack, currentlyPlayingTrack)
  });
};
