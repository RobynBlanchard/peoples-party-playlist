import {
  RESUME_PLAYBACK,
  RESUME_PLAYBACK_SUCCESS,
  RESUME_PLAYBACK_FAILURE,
  PAUSE_PLAYBACK,
  PAUSE_PLAYBACK_SUCCESS,
  PAUSE_PLAYBACK_FAILURE,
  GET_CURRENTLY_PLAYING_SUCCESS
} from '../actions/types';

const defaultState = {
  playing: false,
  currentPlayingTrack: '',
  currentTrack: {
    progress_ms: null,
    uri: '',
  }
};

const playBackReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RESUME_PLAYBACK_SUCCESS:
      return {
        ...state,
        playing: true
      };
    case PAUSE_PLAYBACK_SUCCESS:
      return {
        ...state,
        playing: false
      };
    case GET_CURRENTLY_PLAYING_SUCCESS:
      return {
        ...state,
        currentTrack: {
          progress_ms: action.response.progress_ms,
          uri: action.response.item.uri
      }
    }
    default:
      return state;
  }
};

export default playBackReducer;
