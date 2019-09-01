import { START_SESSION } from '../actions/types';

const defaultState = {
  sessionStarted: false
  // sessionStarted: true // TODO: store in db

};

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_SESSION_SUCCESS':
      return {
        sessionStarted: true
      };
    default:
      return state;
  }
};

export default sessionReducer;
