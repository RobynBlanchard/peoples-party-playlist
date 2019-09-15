import { cloneDeep } from 'lodash';
import {
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE,
  CLEAR_RESULTS,
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_FAILURE,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_DISALLOWED,
} from '../actions/types';

const defaultState = {
  results: [],
  loading: false,
  error: null
};

const searchReducer = (state = defaultState, action) => {
  let results = cloneDeep(state.results);
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        results: action.payload.response.data.tracks.items,
        loading: false,
        error: null
      };
    case FETCH_SEARCH_RESULTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          status: action.payload.error.response.data.error.status,
          message: action.payload.error.response.data.error.message,
          displayMessage: 'Fetch search results failed. Try logging in again.'
        }
      };
    case CLEAR_RESULTS:
      return {
        results: [],
        loading: false,
        error: null
      };
    case ADD_TO_PLAYLIST:
      results[action.payload.positionInSearch].loading = true;
      return {
        ...state,
        results
      };
    case ADD_TO_PLAYLIST_FAILURE:
      const track = action.payload.track;

      if (results.length > 0) {
        results[action.payload.positionInSearch].loading = false;
        results[action.payload.positionInSearch].error = {
          status: action.payload.error.response.data.error.status,
          message: action.payload.error.response.data.error.message,
          displayMessage: `Could not add track - ${track.artist} - ${track.name} to playlist at this time`
        };
      }

      return {
        ...state,
        results
      };
    case ADD_TO_PLAYLIST_DISALLOWED:
      if (results.length > 0) {
        results[action.payload].added = false;
        results[action.payload].loading = false;
        results[action.payload].error = {
          status: null,
          message: null,
          displayMessage: "Can't add a track that is already on the playlist!"
        };
      }

      return {
        ...state,
        results
      };
    case ADD_TO_PLAYLIST_SUCCESS:
      if (results.length > 0) {
        results[action.payload.positionInSearch].loading = false;
        results[action.payload.positionInSearch].error = null;
        results[action.payload.positionInSearch].added = true;
      }

      return {
        ...state,
        results
      };
    default:
      return state;
  }
};

export default searchReducer;
