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
        console.log('fetch')

      return {
        ...state,
        loading: true
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      console.log('sucess')
      console.log(action)
      return {
        results: action.response.tracks.items,
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
      console.log('clear results')
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
