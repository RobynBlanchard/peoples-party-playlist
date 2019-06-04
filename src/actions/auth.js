import { LOG_IN_SUCESS, LOG_IN_FAILURE, LOG_OUT } from './types';

// export const logIn = accesToken => ({
//   type: SIGN_IN,
//   payload: accesToken
// });

export const logInSucess = accesToken => ({
  type: LOG_IN_SUCESS,
  payload: accesToken
});

export const logInFailure = err => ({
  type: LOG_IN_FAILURE,
  payload: err
});

export const logOut = () => ({
  type: LOG_OUT
});
