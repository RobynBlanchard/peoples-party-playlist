import { LOG_IN_SUCESS, LOG_IN_FAILURE, LOG_OUT } from '../actions/types';

const defaultState = {
  token: '',
  error: null,
};

const authentication = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN_SUCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case LOG_OUT:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export default authentication;