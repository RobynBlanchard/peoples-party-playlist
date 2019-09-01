import { START_SESSION } from '../actions/types';

const defaultState = {
  sessionStarted: false
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
