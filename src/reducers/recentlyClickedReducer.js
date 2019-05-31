import { SET_RECENTLY_CLICKED } from '../actions/types';

const defaultState = {
  recentlyClickedTrack: '',
};

const recentlyClickedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_RECENTLY_CLICKED:
      return {
        recentlyClickedTrack: action.payload
      }
    default:
      return state;
    }
}

export default recentlyClickedReducer;