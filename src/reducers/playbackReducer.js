import { PLAY, PAUSE } from '../actions/types';

const defaultState = {
  playing: false
};

const playBackReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PLAY:
      return {
        playing: true
      };
    case PAUSE:
      return {
        playing: false
      };
    default:
      return state;
  }
};

export default playBackReducer;
