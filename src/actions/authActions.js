import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = accesToken => ({
  type: SIGN_IN,
  payload: accesToken
});

export const signOut = () => ({
  type: SIGN_OUT
});
