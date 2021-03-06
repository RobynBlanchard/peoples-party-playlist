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
  loading: false,
  error: null,
  playing: false,
  currentPlayingTrack: '',
  currentTrack: {
    uri: '',
    artist: '',
    name: ''
  },
  progress_ms: null
};

const playBackReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RESUME_PLAYBACK:
      return {
        ...state,
        loading: true
      };
    case RESUME_PLAYBACK_SUCCESS:
      return {
        ...state,
        playing: true,
        loading: false,
        error: null
      };
    case RESUME_PLAYBACK_FAILURE:
      const status = action.payload.error.response.data.error.status;
      return {
        ...state,
        loading: false,
        playing: false,
        error: {
          status,
          message: action.payload.error.response.data.error.message,
          displayMessage:
            status === 401
              ? 'please log out and in again'
              : "Couldn't find active device, make sure you have spotify open"
        }
      };
    case PAUSE_PLAYBACK_SUCCESS:
      return {
        ...state,
        playing: false
      };

    case GET_CURRENTLY_PLAYING_SUCCESS:
      if (action.payload.response.data.item) {
        return {
          ...state,
          progress_ms: action.payload.response.data.progress_ms,
          currentTrack: {
            uri: action.payload.response.data.item.uri,
            artist: action.payload.response.data.item.artists[0].name,
            name: action.payload.response.data.item.name
          }
        };
      } else {
        return {
          ...state
        };
      }
    default:
      return state;
  }
};

export default playBackReducer;
