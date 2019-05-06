import { PLAY, PAUSE } from '../actions/types';

const defaultState = {
  playing: false,
  currentPlayingTrack: ''
};

const playBackReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PLAY:
      return {
        ...state,
        playing: true
      };
    case PAUSE:
      return {
        ...state,
        playing: false
      };
    case 'CURRENTLY_PLAYING':
      return {
        ...state,
        currentPlayingTrack: action.payload.uri
      }
    default:
      return state;
  }
};

export default playBackReducer;
