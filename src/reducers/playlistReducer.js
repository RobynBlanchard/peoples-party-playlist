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
  tracks: [],
  lockedTrack: [],
  error: null,
  loading: false,
  trackError: null
};

const playlistReducer = (state = defaultState, action) => {
  let tracks = cloneDeep(state.tracks);
  let lockedTrack = cloneDeep(state.lockedTrack);
  let removedPlaylist = cloneDeep(state.removedPlaylist);
  console.log('actoin', action.type)
  switch (action.type) {
    case FETCH_PLAYLIST_FROM_DB:
      console.log('fetch from db')
      // debugger

      return {
        ...state,
        loading: true
      };
    case FETCH_PLAYLIST_FROM_DB_SUCCESS:
      console.log('fetch from db success', action.payload.response.data.tracks)
      const fetchedTracks = action.payload.response.data.tracks;
      tracks = [];
      lockedTrack = [];
      removedPlaylist = [];

      
      fetchedTracks.forEach(track => {
        if (track.removed) {
          removedPlaylist.push(track);
        } else if (track.locked && !track.removed) {
          lockedTrack.push(track);
        } else {
          tracks.push(track);
        }
      });
      // debugger

      return {
        ...state,
        loading: false,
        tracks,
        lockedTrack,
        removedPlaylist
      };
    case FETCH_PLAYLIST_FROM_DB_FAILURE:
      console.log(action)
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case DELETE_TRACK:
      tracks[action.payload.position].loading = true;

      return {
        ...state,
        tracks
      };

    case DELETE_TRACK_SUCCESS:
      tracks[action.payload.position].loading = false;
      tracks[action.payload.position].error = null;
      tracks.splice(action.payload.position, 1);

      return {
        ...state,
        tracks
      };
    case DELETE_TRACK_FAILURE:
      tracks[action.payload.position].loading = false;
      tracks[action.payload.position].error = {
        status: action.payload.error.response.data.error.status,
        message: action.payload.error.response.data.error.message,
        displayMessage: 'could not update track at this time'
      };
      return {
        ...state,
        tracks
      };
    case ADD_TO_PLAYLIST_SUCCESS:
      tracks.splice(action.payload.position, 0, action.payload.track);
      return {
        ...state,
        tracks: tracks,
        trackError: null
      };
    case UPDATE_TRACK:
      // tracks[action.payload.position].loading = true;

      return {
        ...state,
        tracks: tracks,
        trackError: null
      };

    case UPDATE_TRACK_SUCCESS:
      console.log(action.payload)
      tracks[action.payload.position].loading = false;
      tracks.splice(action.payload.position, 1);
      tracks.splice(
        action.payload.newPosition,
        0,
        action.payload.track
      );

      // debugger

      // tracks[action.payload.newPosition].loading = false;

      return {
        ...state,
        tracks,
        trackError: null
      };
    case UPDATE_TRACK_FAILURE:
      tracks[action.payload.position].loading = false;

      return {
        ...state,
        tracks,
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
      if (tracks.length > 0) {
        lockedTrack = [tracks[0]];
        tracks.shift();
      }
      if (lockedTrack.length > 0) {
        lockedTrack[0].locked = true;
      }
      return {
        ...state,
        lockedTrack,
        tracks,
        removedPlaylist,
        trackError: null
      };
    case 'START_SESSION_SUCCESS':
      if (lockedTrack.length > 0) {
        lockedTrack[0].removed = true;
        removedPlaylist.push(lockedTrack[0]);
      }
      lockedTrack = [tracks[0]];
      if (lockedTrack.length > 0) {
        lockedTrack[0].locked = true;
      }

      tracks.shift();
      return {
        ...state,
        lockedTrack,
        tracks,
        removedPlaylist
      };
    default:
      return state;
  }
};

export default playlistReducer;
