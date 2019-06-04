import { SIGN_IN, SIGN_OUT, FETCH_USER } from '../actions/types';

const defaultState = {
  signedIn: false,
  loading: false,
  error: null,
  token: '',
  userId: ''
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        signedIn: true,
        token: action.payload.token
      };
    case SIGN_OUT:
      return {
        signedIn: false,
        token: '',
        user: ''
      };
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        // userId: action.payload
        // userId: action.payload.display_name

      };
    case 'FETCH_USER_SUCCESS':
          return {
            ...state,
            // loading: false, TODO:
            userId: action.response.display_name
          };
    default:
      return state;
  }
};

export default authReducer;
