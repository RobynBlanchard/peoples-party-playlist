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
import { cloneDeep } from 'lodash';

const defaultState = {
  removedPlaylist: [],
  playablePlaylist: [],
  lockedTrack: [],
  error: null,
  loading: false,
  trackError: null
};

// TODO: rename to playlist
const playlistsReducer = (state = defaultState, action) => {
  let playablePlaylist = cloneDeep(state.playablePlaylist);
  let lockedTrack = cloneDeep(state.lockedTrack);
  let removedPlaylist = cloneDeep(state.removedPlaylist);

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
        lockedTrack,
        removedPlaylist
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
      };
      return {
        ...state,
        playablePlaylist
      };
    case ADD_TO_PLAYLIST_SUCCESS:
      playablePlaylist.splice(action.payload.position, 0, action.payload.track);
      return {
        ...state,
        playablePlaylist: playablePlaylist,
        trackError: null
      };
    case UPDATE_TRACK:
      playablePlaylist[action.payload.position].loading = true;

      return {
        ...state,
        playablePlaylist: playablePlaylist,
        trackError: null
      };

    case UPDATE_TRACK_SUCCESS:
      playablePlaylist.splice(action.payload.position, 1);
      playablePlaylist.splice(
        action.payload.newPosition,
        0,
        action.payload.track
      );

      playablePlaylist[action.payload.newPosition].loading = false;

      return {
        ...state,
        playablePlaylist,
        trackError: null
      };
    case UPDATE_TRACK_FAILURE:
      playablePlaylist[action.payload.position].loading = false;

      return {
        ...state,
        playablePlaylist,
        trackError: {
          position: action.payload.position,
          error: {
            status: action.payload.error.response.data.error.status,
            message: action.payload.error.response.data.error.message,
            displayMessage: 'could not update track at this time'
          }
        }
      };
    case 'UPVOTE_LIMIT_EXCEEDED':
      return {
        ...state,
        trackError: {
          position: action.payload,
          error: {
            status: '',
            message: '',
            displayMessage: 'cannot upvote more than 3 times on a track!'
          }
        }
      };
    case 'DOWNVOTE_LIMIT_EXCEEDED':
      const err = {
        position: action.payload,
        error: {
          status: '',
          message: '',
          displayMessage: 'cannot downvote more than 2 times on a track!'
        }
      };
      return {
        ...state,
        trackError: err
      };
    case 'UPDATE_CURRENT_TRACK_SUCCESS':
      if (lockedTrack.length > 0) {
        lockedTrack[0].removed = true;
        removedPlaylist.push(lockedTrack[0]);
        lockedTrack.pop();
      }
      if (playablePlaylist.length > 0) {
        lockedTrack = [playablePlaylist[0]];
        playablePlaylist.shift();
      }
      if (lockedTrack.length > 0) {
        lockedTrack[0].locked = true;
      }
      return {
        ...state,
        lockedTrack,
        playablePlaylist,
        removedPlaylist,
        trackError: null
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
