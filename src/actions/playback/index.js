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
import { playlistId } from '../../utils/constants';
import { updateTrackDb } from '../utils/apiDb';
import PollAPI from '../utils/pollAPI';
import axios from 'axios';

export const resumePlaybackSpotify = (
  playbackPosition,
  playlistIndex,
  token
) => {
  return spotifyApi(token).put('me/player/play', {
    context_uri: `spotify:playlist:${playlistId}`,
    offset: { position: playlistIndex },
    position_ms: playbackPosition
  });
};

const pauseSpotifyAndPoll = token => {
  return spotifyApi(token)
    .put('me/player/pause')
    .then(res => PollAPI.stop());
};

export const pausePlayback = () => ({
  types: [PAUSE_PLAYBACK, PAUSE_PLAYBACK_SUCCESS, PAUSE_PLAYBACK_FAILURE],
  callAPI: token => pauseSpotifyAndPoll(token),
  requiresAuth: true
});

export const getCurrentlyPlayingSpotify = token => {
  return spotifyApi(token).get('me/player/currently-playing');
};

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

const playTrackAction = (
  token,
  shouldLockTopTrack,
  progress_ms,
  spotifyOffset,
  tracks,
  dispatch
) => {
  // TODO use call api middleare or dispatch success and failure..
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
      progress_ms,
      parseInt(spotifyOffset, 10),
      token
    )
      .then(res => {
        // return axios.patch(`/api/v1/playlist/tracks/${tracks[0].uri}`, {
        //   update: { $set: { locked: true } }
        // });
        return updateTrackDb(tracks[0].uri, { $set: { locked: true } });
      })
      .then(res => {
        PollAPI.start();
      });
  }

  return resumePlaybackSpotify(
    progress_ms,
    parseInt(spotifyOffset, 10),
    token
  ).then(res => {
    PollAPI.start();
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

export const playTrackOld = () => (dispatch, getState) => {
  const state = getState();
  const { tracks, lockedTrack, removedPlaylist } = state.playlist;
  const { progress_ms } = state.playback;
  const spotifyOffset = removedPlaylist.length;
  const token = getState().auth.token;

  // const callAPI = token => playTrackAction(token);
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
