import axios from 'axios';
import {
  START_SESSION,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE
} from '../actions/types';

// TODO: - save session in db
export const startSession = () => (dispatch, getState) => {
  const state = getState();
  const { playablePlaylist } = state.playlist;

  dispatch({
    types: [START_SESSION, START_SESSION_SUCCESS, START_SESSION_FAILURE],
    callAPI: () =>
      axios.patch(`/api/v1/playlist/tracks/${playablePlaylist[0].uri}`, {
        update: { $set: { locked: true } }
      })
  });
};
