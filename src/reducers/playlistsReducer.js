import {
  FETCH_PLAYLIST_FROM_DB,
  FETCH_PLAYLIST_FROM_DB_SUCCESS,
  FETCH_PLAYLIST_FROM_DB_FAILURE,
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE,
  DELETE_TRACK,
  DELETE_TRACK_SUCCESS,
  DELETE_TRACK_FAILURE,
  UPDATE_TRACK,
  UPDATE_TRACK_SUCCESS,
  UPDATE_TRACK_FAILURE
} from '../actions/types';

const defaultState = {
  removedPlaylist: [],
  playablePlaylist: [],
  lockedTrack: [],
  error: null,
  loading: false
};

// rename to playlist
const playlistsReducer = (state = defaultState, action) => {
  let playablePlaylist = state.playablePlaylist;
  let lockedTrack = state.lockedTrack;
  let removedPlaylist = state.removedPlaylist;

  switch (action.type) {
    case FETCH_PLAYLIST_FROM_DB:
      return {
        ...state,
        loading: true
      };
    case FETCH_PLAYLIST_FROM_DB_SUCCESS:
      const tracks = action.payload.response.data.tracks;
      playablePlaylist = [];
      lockedTrack = [];
      removedPlaylist = [];

      tracks.forEach(track => {
        if (track.removed) {
          removedPlaylist.push(track);
        } else if (track.locked && !track.removed) {
          lockedTrack.push(track);
        } else {
          playablePlaylist.push(track);
        }
      });

      return {
        ...state,
        loading: false,
        playablePlaylist,
        lockedTrack
      };
    case FETCH_PLAYLIST_FROM_DB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case DELETE_TRACK:
      playablePlaylist[action.payload.position].loading = true;

      return {
        ...state,
        playablePlaylist
      };

    case DELETE_TRACK_SUCCESS:
      playablePlaylist[action.payload.position].loading = false;
      playablePlaylist[action.payload.position].error = null;
      playablePlaylist.splice(action.payload.position, 1);
      // playablePlaylist = playablePlaylist.filter(
      //   track => track.uri !== action.payload.uri
      // );
      return {
        ...state,
        playablePlaylist
      };
    case DELETE_TRACK_FAILURE:
      playablePlaylist[action.payload.position].loading = false;
      playablePlaylist[action.payload.position].error = {
        status: action.payload.error.response.data.error.status,
        message: action.payload.error.response.data.error.message,
        displayMessage: 'could not update track at this time'
      }
      return {
        ...state,
        playablePlaylist
      };
    case ADD_TO_PLAYLIST_SUCCESS:
      playablePlaylist.splice(action.payload.position, 0, action.payload.track);
      return {
        ...state,
        playablePlaylist: playablePlaylist
      };
    // case ADD_TO_PLAYLIST_FAILURE:
    //   // TODO: alert user
    //   break;
    case UPDATE_TRACK:
      playablePlaylist[action.payload.position].loading = true;
      return {
        ...state,
        playablePlaylist: playablePlaylist,
      };

    case UPDATE_TRACK_SUCCESS:
      playablePlaylist[action.payload.position].loading = false;
      playablePlaylist.splice(action.payload.position, 1);

      playablePlaylist.splice(
        action.payload.newPosition,
        0,
        action.payload.track
      );

      // playablePlaylist.splice(
      //   action.payload.newPosition,
      //   0,
      //   playablePlaylist.splice(action.payload.position, 1)[0]
      // )

      return {
        ...state,
        playablePlaylist
      };
    case UPDATE_TRACK_FAILURE:
      playablePlaylist[action.payload.position].loading = false;
      playablePlaylist[action.payload.position].error = {
        status: action.payload.error.response.data.error.status,
        message: action.payload.error.response.data.error.message,
        displayMessage: 'could not update track at this time'
      }

      return {
        ...state
      };
    case 'UPDATE_CURRENT_TRACK_SUCCESS':
      if (lockedTrack.length > 0) {
        lockedTrack[0].removed = true;
        removedPlaylist.push(lockedTrack[0]);
      }
      lockedTrack = [playablePlaylist[0]];
      if (lockedTrack.length > 0) {
        lockedTrack[0].locked = true;
      }

      playablePlaylist.shift();

      return {
        ...state,
        lockedTrack,
        playablePlaylist,
        removedPlaylist
      };
    case 'START_SESSION_SUCCESS':
      if (lockedTrack.length > 0) {
        lockedTrack[0].removed = true;
        removedPlaylist.push(lockedTrack[0]);
      }
      lockedTrack = [playablePlaylist[0]];
      if (lockedTrack.length > 0) {
        lockedTrack[0].locked = true;
      }

      playablePlaylist.shift();

      return {
        ...state,
        lockedTrack,
        playablePlaylist,
        removedPlaylist
      };
    default:
      return state;
  }
};

export default playlistsReducer;
