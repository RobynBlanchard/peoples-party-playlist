import {
  FETCH_SEARCH_RESULTS
} from '../actions/types';

const defaultState = {
  results: [],
};

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      return {
        results: action.payload.items
      };

    default:
      return state;
  }
};

export default searchReducer;
