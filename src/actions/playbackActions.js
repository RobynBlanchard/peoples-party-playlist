import { PLAY, PAUSE, START_SESSION } from './types';
import apiInstance from '../api';

export const startSession = () => {
  return {
    type: START_SESSION,
    payload: true
  }
};

export const play = () => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    return apiInstance(token)
      .put('me/player/play', {
        context_uri: 'spotify:playlist:1OZWEFHDuPYYuvjCVhryXV',
        offset: {"position": 0}
      })
      .then(data => {
        dispatch({
          type: 'PLAY'
        });
        if (!getState().session.sessionStarted) {
          dispatch({
            type: START_SESSION,
            payload: true,
          });
        }

      })
      .catch(err => {
        console.log('play/resume playback failed', err);
      });
  } else {
    console.log('play/resume playback failed, no token');
  }
};

export const pause = () => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    return apiInstance(token)
      .put('me/player/pause')
      .then(data => {
        dispatch({
          type: 'PAUSE'
        });
      })
      .catch(err => {
        console.log('pause playback failed', err);
      });
  } else {
    console.log('pause playback failed, no token');
  }
};
