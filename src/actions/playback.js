import {
  UPDATE_CURRENT_TRACK,
  UPDATE_CURRENT_TRACK_SUCCESS,
  UPDATE_CURRENT_TRACK_FAILURE,
  GET_CURRENTLY_PLAYING,
  GET_CURRENTLY_PLAYING_SUCCESS,
  GET_CURRENTLY_PLAYING_FAILURE,
  START_SESSION,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE,
  RESUME_PLAYBACK,
  RESUME_PLAYBACK_SUCCESS,
  RESUME_PLAYBACK_FAILURE,
  PAUSE_PLAYBACK,
  PAUSE_PLAYBACK_SUCCESS,
  PAUSE_PLAYBACK_FAILURE
} from './types';
import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import { updateTrack } from './apiDb';
import axios from 'axios';

const sendSocketMessage = action => {
  return {
    handler: 'WS',
    ...action
  };
};

const resumePlaybackSpotify = (playbackPosition, playlistIndex, token) => {
  return spotifyApi(token).put('me/player/play', {
    context_uri: `spotify:playlist:${playlistId}`,
    offset: { position: playlistIndex },
    position_ms: playbackPosition
  });
};

// TODO: with socket
export const resumePlayback = () => (dispatch, getState) => {
  const state = getState();
  const { progress_ms } = state.playback;
  const { removedPlaylist } = state.playlists;
  const spotifyOffset = removedPlaylist.length;

  dispatch({
    types: [RESUME_PLAYBACK, RESUME_PLAYBACK_SUCCESS, RESUME_PLAYBACK_FAILURE],
    callAPI: token =>
      resumePlaybackSpotify(progress_ms, parseInt(spotifyOffset, 10), token),
    requiresAuth: true
  });
};

// TODO: with socket
export const startSession = () => (dispatch, getState) => {
  const state = getState();
  const { playablePlaylist } = state.playlists;

  dispatch({
    types: [START_SESSION, START_SESSION_SUCCESS, START_SESSION_FAILURE],
    callAPI: () =>
      axios.patch(`/playlist/api/v1/tracks/${playablePlaylist[0].uri}`, {
        update: { $set: { locked: true } }
      })
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
    updateTrack(previouslyPlayingTrack, {
      $set: { removed: true }
    }),
    updateTrack(currentlyPlayingTrack, { $set: { locked: true } })
  ]);

export const updateCurrentTrack = () => (dispatch, getState) => {
  const state = getState();
  const currentlyPlayingTrack = state.playback.currentTrack.uri;
  const previouslyPlayingTrack = state.playlists.lockedTrack[0];

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
