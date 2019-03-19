import apiInstance from '../api';
import { SIGN_IN, SIGN_OUT, FETCH_USER } from './types';

export const signIn = accesToken => ({
  type: SIGN_IN,
  payload: accesToken
});

export const signOut = () => ({
  type: SIGN_OUT
});

const dispatchUser = user => ({
  type: FETCH_USER,
  payload: user
});

export const fetchUser = () => (dispatch, getState) => {
  const token = getState().auth.token;
  if (token) {
    return apiInstance(token)
      .get('me')
      .then(data => {
        dispatch(dispatchUser(data.data.display_name));
      })
      .catch(err => {
        dispatch(dispatchUser(''));
      });
  } else {
    return dispatch(dispatchUser(''));
  }
};
