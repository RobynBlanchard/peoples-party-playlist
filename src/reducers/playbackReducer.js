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
    // progress_ms: null,
    uri: '',
    artist: '',
    name: '',
  },
  progress_ms: null,
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

      // dont want to send this all the time
    case GET_CURRENTLY_PLAYING_SUCCESS:
      return {
        ...state,
        progress_ms: action.payload.response.data.progress_ms,
          currentTrack: {
            uri: action.payload.response.data.item.uri,
            artist: action.payload.response.data.item.artists[0].name,
            name: action.payload.response.data.item.name,
        }
    }
    default:
      return state;
  }
};

export default playBackReducer;

// press play
// remove first track from playlist
// set currently lplaying
// set track as locked