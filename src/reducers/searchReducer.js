import {
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE,
  CLEAR_RESULTS
} from '../actions/types';

const defaultState = {
  results: [],
  loading: false,
  error: null
};

const searchReducer = (state = defaultState, action) => {
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
        error: action
      };
    case CLEAR_RESULTS:
      return {
        results: [],
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default searchReducer;
