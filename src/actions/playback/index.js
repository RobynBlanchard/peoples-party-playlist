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
import { updateTrackDb } from '../utils/apiDb';
import PollAPI from '../utils/pollAPI';
import {
  resumePlaybackSpotify,
  pausePlaybackSpotify,
  getCurrentlyPlayingSpotify
} from '../utils/apiSpotify';

const pauseSpotifyAndPoll = token => {
  return pausePlaybackSpotify(token).then(res => PollAPI.stop());
};

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

const playTrackAction = (
  token,
  shouldLockTopTrack,
  progress_ms,
  spotifyOffset,
  tracks,
  dispatch
) => {
  PollAPI.setFn(() =>
    getCurrentlyPlayingSpotify(token).then(res => {
      dispatch({
        type: 'GET_CURRENTLY_PLAYING_SUCCESS',
        payload: { response: res }
      });
    })
  );

  if (shouldLockTopTrack) {
    return resumePlaybackSpotify(
      token,
      parseInt(spotifyOffset, 10),
      progress_ms
    )
      .then(res => {
        return updateTrackDb(tracks[0].uri, { $set: { locked: true } });
      })
      .then(res => {
        PollAPI.start();
      });
  }

  return resumePlaybackSpotify(
    token,
    parseInt(spotifyOffset, 10),
    progress_ms
  ).then(res => {
    PollAPI.start();
  });
};

export const pauseTrack = () => ({
  types: [PAUSE_PLAYBACK, PAUSE_PLAYBACK_SUCCESS, PAUSE_PLAYBACK_FAILURE],
  callAPI: token => pauseSpotifyAndPoll(token),
  requiresAuth: true
});

export const getCurrentlyPlayingTrack = () => ({
  types: [
    GET_CURRENTLY_PLAYING,
    GET_CURRENTLY_PLAYING_SUCCESS,
    GET_CURRENTLY_PLAYING_FAILURE
  ],
  callAPI: token => getCurrentlyPlayingSpotify(token),
  requiresAuth: true
});

export const updateCurrentTrack = () => (dispatch, getState) => {
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

export const playTrack = () => (dispatch, getState) => {
  const state = getState();
  const { tracks, lockedTrack, removedPlaylist } = state.playlist;
  const { progress_ms } = state.playback;
  const spotifyOffset = removedPlaylist.length;
  const shouldLockTopTrack = lockedTrack.length === 0;

  dispatch({
    types: [RESUME_PLAYBACK, RESUME_PLAYBACK_SUCCESS, RESUME_PLAYBACK_FAILURE],
    callAPI: token =>
      playTrackAction(
        token,
        shouldLockTopTrack,
        progress_ms,
        spotifyOffset,
        tracks,
        dispatch
      ),
    requiresAuth: true
  });
};
