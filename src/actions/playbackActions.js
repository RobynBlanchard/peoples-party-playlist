import { PLAY, PAUSE, START_SESSION } from './types';
import apiInstance from '../api';

export const startSession = () => {
  return {
    type: START_SESSION,
    payload: true
  }
};

export const resumePlayback = () => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    return apiInstance(token)
      .put('me/player/play', {
        context_uri: 'spotify:playlist:1OZWEFHDuPYYuvjCVhryXV',
        offset: {"position": 0}
      })
      .then(data => {
        console.log('play action')
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

export const pausePlayback = () => (dispatch, getState) => {
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

export const getCurrentlyPlayingTrack = () => (dispatch, getState) => {
  const token = getState().auth.token;
  if (token) {
    return apiInstance(token)
      .get('me/player/currently-playing')
      .then(data => {
        const topSong = getState().playlists.playlist[0].uri;
        const currentSong = data.data.item.uri;

        if (topSong !== currentSong) {
          return dispatch(removeTrack(topSong))
        }
      })
      .catch(err => {
        console.log('get currently playing failed', err);
      });
  } else {
    console.log('get currently playing failed, no token');
  }

}

export const removeFromPlaylist = position => ({
  type: 'REMOVE_FROM_PLAYLIST',
  payload: position
});

// duplicated in playlist actions!!!
const removeTrack = (uri) => (dispatch, getState) => {
  const token = getState().auth.token;

  if (token) {
    return (
      apiInstance(token)
        .delete(`playlists/1OZWEFHDuPYYuvjCVhryXV/tracks`, {
          data: {
            tracks: [{ uri }]
          }
        })
        .then(data => {
          dispatch(removeFromPlaylist(0));
          return dispatch({
            type: 'CURRENTLY_PLAYING',
            payload: {
              uri: uri
            }
          });
        })
        .catch(err => {
          console.log('no user id', err);
        })
    );
  } else {

    console.log(`remove track failed`);
  }
};