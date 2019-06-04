import {
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE
} from '../actions/types';

const defaultState = {
  results: [],
};

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_SUCCESS:
      // TODO: not just return tracks
      return {
        results: action.response.tracks.items
      };

    default:
      return state;
  }
};

export default searchReducer;
