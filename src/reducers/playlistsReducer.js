import {
  REORDER_TRACK,
  REORDER_TRACK_SUCCESS,
  REORDER_TRACK_FAILURE,
  FETCH_PLAYLIST_FROM_DB,
  FETCH_PLAYLIST_FROM_DB_SUCCESS,
  FETCH_PLAYLIST_FROM_DB_FAILURE,
  MOVE_UP_PlAYLIST,
  MOVE_DOWN_PlAYLIST,
  REMOVE_FROM_PLAYLIST,
  ADD_TO_PLAYLIST,
  INCREASE_VOTE,
  DECREASE_VOTE,
  REMOVE_TRACK,
  REMOVE_TRACK_SUCCESS,
  REMOVE_TRACK_FAILURE,
  ADD_TO_SPOTIFY_PLAYLIST,
  ADD_TO_SPOTIFY_PLAYLIST_SUCCESS,
  ADD_TO_SPOTIFY_PLAYLIST_FAILURE,
  REORDER_TRACK_SPOTIFY,
  REORDER_TRACK_SPOTIFY_SUCCESS,
  REORDER_TRACK_SPOTIFY_FAILURE,
  UPDATE_VOTE,
  REMOVE_TRACK_FROM_DB_SUCCESS
} from '../actions/types';

// could have an error attribute on each track object?

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

    case REORDER_TRACK:
      playablePlaylist.splice(
        action.payload.insert_before,
        0,
        playablePlaylist.splice(action.payload.range_start, 1)[0]
      );

      return {
        ...state,
        playablePlaylist,
        loading: false,
        error: null
      };
    case REMOVE_TRACK_FROM_DB_SUCCESS:
      playablePlaylist[action.payload.position].removed = true;
      removedPlaylist.push(playablePlaylist[action.payload.position]);
      playablePlaylist.splice(action.payload.position, 1);

      return {
        ...state,
        playablePlaylist,
        removedPlaylist
      };
    case REMOVE_TRACK_FAILURE:
      break;
    case ADD_TO_PLAYLIST:
      playablePlaylist.splice(action.payload.position, 0, action.payload.track);
      return {
        ...state,
        playablePlaylist: playablePlaylist
      };
    // TODO: handle these properly
    case ADD_TO_SPOTIFY_PLAYLIST:
      return {
        ...state
      };
    case ADD_TO_SPOTIFY_PLAYLIST_SUCCESS:
      return {
        ...state
      };
    case ADD_TO_SPOTIFY_PLAYLIST_FAILURE:
      return {
        ...state
      };
    case REORDER_TRACK_SPOTIFY:
      return {
        ...state
      };
    case REORDER_TRACK_SPOTIFY_SUCCESS:
      return {
        ...state
      };
    case REORDER_TRACK_SPOTIFY_FAILURE:
      return {
        ...state
      };
    case 'UPDATE_TRACK_IN_DB_SUCCESS':
      return {
        ...state
      };
    case 'UPDATE_TRACK':
      playablePlaylist.splice(action.payload.position, 1)

      playablePlaylist.splice(
        action.payload.newPosition,
        0,
        action.payload.track
      );

      return {
        ...state,
        playablePlaylist
      };

    case 'START_SESSION_SUCCESS':
        // debugger

      if (lockedTrack.length > 0) {
        lockedTrack[0].removed = true;
        removedPlaylist.push(lockedTrack[0]);
      }
      lockedTrack = [playablePlaylist[0]];
      if (lockedTrack.length > 0) {
        lockedTrack[0].locked = true;
      }

      playablePlaylist.shift();

      console.log('lockedTrack', lockedTrack);
      console.log('playablePlaylist', playablePlaylist);
      console.log('removedPlaylist', removedPlaylist);

      return {
        ...state,
        lockedTrack,
        playablePlaylist,
        removedPlaylist
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

        console.log('lockedTrack', lockedTrack);
        console.log('playablePlaylist', playablePlaylist);
        console.log('removedPlaylist', removedPlaylist);

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
