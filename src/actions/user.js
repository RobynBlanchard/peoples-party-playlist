import {
  FETCH_USER_ID,
  FETCH_USER_ID_SUCCESS,
  FETCH_USER_ID_FAILURE
} from '../actions/types';
import api from './api';

// spotify user
export const fetchUser = () => ({
  types: [FETCH_USER_ID, FETCH_USER_ID_SUCCESS, FETCH_USER_ID_FAILURE],
  shouldCallAPI: state => !state.user.userId,
  callAPI: token => api(token).get('me'),
  requiresAuth: true
});

// app user
export const assignUser = userId => ({
  type: 'ASSIGN_APP_USER',
  payload: userId
});
