import axios from 'axios';
import {
  START_SESSION,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE
} from '../actions/types';

// TODO: - save session in db
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