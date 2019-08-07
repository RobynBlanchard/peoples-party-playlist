import { FETCH_USER_ID, FETCH_USER_ID_SUCCESS, FETCH_USER_ID_FAILURE } from '../actions/types';

const defaultState = {
  userId: '',
  loading: false,
  error: null,
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_USER_ID:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.payload.response.display_name
      };
    case FETCH_USER_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error.Error,
      };
    default:
      return state;
  }
};

export default user;
