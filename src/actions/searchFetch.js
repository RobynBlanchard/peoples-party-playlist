import spotifyApi from '../api';
import {
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE
} from './types';

export const dispatchFetchSearchResults = (query) => ({
  types: [FETCH_SEARCH_RESULTS, FETCH_SEARCH_RESULTS_SUCCESS, FETCH_SEARCH_RESULTS_FAILURE],
  callAPI: token => spotifyApi(token).get(`search${query}`)
});

export const fetchSearchResults = searchTerm => (dispatch, getState) => {
  const query = '?q=' + searchTerm + '&type=album,track,artist,playlist';
  // const query = '?q=' + searchTerm + '&type=track';

  return dispatch(dispatchFetchSearchResults(query));
};