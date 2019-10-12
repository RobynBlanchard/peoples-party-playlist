import spotifyApi from './api';
import {
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE,
  CLEAR_RESULTS
} from './types';

export const dispatchFetchSearchResults = query => ({
  types: [
    FETCH_SEARCH_RESULTS,
    FETCH_SEARCH_RESULTS_SUCCESS,
    FETCH_SEARCH_RESULTS_FAILURE
  ],
  callAPI: token => spotifyApi(token).get(`search${query}`),
  requiresAuth: true,
});

export const fetchSearchResults = searchTerm => (dispatch, getState) => {
  if (searchTerm) {
    const termWithSpacesEncoded = searchTerm.replace(' ', '%20');
    const termWithWildCard = termWithSpacesEncoded + '*';
    const query =
      '?q=' + termWithWildCard + '&type=album,track,artist,playlist';
    return dispatch(dispatchFetchSearchResults(query));
  }

  return dispatch({
    type: CLEAR_RESULTS
  });
};
