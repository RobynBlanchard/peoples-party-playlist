// TODO:
// playlist session
// click refresh
// user can order any songs on playlist
// once play button is hit for first time
// a session is started
// from then on the top track is locked in
// user can order any songs other than locked in track
// user can pause playback and resume

import { START_SESSION } from '../actions/types';

const defaultState = {
  sessionStarted: false,
};

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_SESSION:
      return {
        sessionStarted: true
      };
    default:
      return state;
  }
};

export default sessionReducer;
