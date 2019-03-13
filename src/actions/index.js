import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';

const dispatchUser = user => ({
  type: FETCH_USER,
  payload: user,
});

export const fetchUser = () => (dispatch, getState) => {
  const token = getState().loggedIn.token
  if (token) {
    var instance = axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      timeout: 1000,
      headers: { Authorization: `Bearer ${token}` }
    });
    return instance.get('me').then(data => {
      console.log('fetch user action user:', data.data.display_name)
      dispatch(dispatchUser(data.data.display_name));
    }).catch(err => {
      dispatch(dispatchUser(''));
    });
  } else {
    return dispatch(dispatchUser(''));
  }
};
