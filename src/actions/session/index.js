import axios from 'axios';
import {
  START_SESSION,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE
} from '../types';

// TODO: - save session in db
export const startSession = () => (dispatch, getState) => {
  const state = getState();
  const { tracks } = state.playlist;
  dispatch({
    types: [START_SESSION, START_SESSION_SUCCESS, START_SESSION_FAILURE],
    callAPI: () =>
      axios.patch(`/api/v1/playlist/tracks/${tracks[0].uri}`, {
        update: { $set: { locked: true } }
      })
  });
};
