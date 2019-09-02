import {
  FETCH_PLAYLIST_FROM_DB,
  FETCH_PLAYLIST_FROM_DB_SUCCESS,
  FETCH_PLAYLIST_FROM_DB_FAILURE,
  REMOVE_FROM_PLAYLIST,
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE,
  REMOVE_TRACK,
  REMOVE_TRACK_SUCCESS,
  REMOVE_TRACK_FAILURE,
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
    case 'DELETE_TRACK_SUCCESS':
      playablePlaylist = playablePlaylist.filter(track => track.uri !== action.payload.uri)
      // or
      // playablePlaylist.splice(action.payload.position, 1)
      return {
        ...state,
        playablePlaylist
      }
    // case REMOVE_TRACK_FROM_DB_SUCCESS:

    //   playablePlaylist[action.payload.position].removed = true;
    //   removedPlaylist.push(playablePlaylist[action.payload.position]);
    //   playablePlaylist.splice(action.payload.position, 1);

    //   return {
    //     ...state,
    //     playablePlaylist,
    //     removedPlaylist
    //   };
    // case REMOVE_TRACK_FAILURE:
    //   break;
    // case ADD_TO_PLAYLIST:
    //   // TODO: add loading spinner to track in search
    //   break;
    case ADD_TO_PLAYLIST_SUCCESS:
      playablePlaylist.splice(action.payload.position, 0, action.payload.track);
      return {
        ...state,
        playablePlaylist: playablePlaylist
      };
    // case ADD_TO_PLAYLIST_FAILURE:
    //   // TODO: alert user
    //   break;
    case 'UPDATE_TRACK_SUCCESS':
      playablePlaylist.splice(action.payload.position, 1)

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
