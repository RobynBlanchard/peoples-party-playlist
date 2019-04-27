import apiInstance from '../api';
import {
  FETCH_SEARCH_RESULTS,
} from './types';

const dispatchSearchResults = results => ({
  type: FETCH_SEARCH_RESULTS,
  payload: results
});

export const fetchSearchResults = searchTerm => (dispatch, getState) => {
  console.log('herererere')
  const token = getState().auth.token;

  // const query = '?q=' + searchTerm + '&type=album,track,artist,playlist';
  const query = '?q=' + searchTerm + '&type=track';

  if (token) {
    return apiInstance(token)
      .get(`search${query}`)
      .then(data => {
        console.log('data', data.data.tracks);
        dispatch(dispatchSearchResults(data.data.tracks));
      })
      .catch(err => {
        console.log('no user id', err);
      });
  } else {
    console.log('fetchUser playlists failed, no token');
  }
};