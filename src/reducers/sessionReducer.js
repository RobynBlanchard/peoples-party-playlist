import {
  START_SESSION,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE
} from '../actions/types';

const defaultState = {
  loading: false,
  sessionStarted: false,
  error: null
};

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_SESSION:
      return {
        ...state,
        loading: true
      };
    case START_SESSION_SUCCESS:
      return {
        loading: false,
        sessionStarted: true
      };
    case START_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          status: action.payload.error.response.data.error.status,
          message: action.payload.error.response.data.error.message,
          displayMessage: 'could not start session at this time'
        }
      };
    default:
      return state;
  }
};

export default sessionReducer;
