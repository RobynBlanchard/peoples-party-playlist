import {
  FETCH_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
  REORDER_TRACK,
  REORDER_TRACK_SUCCESS,
  REORDER_TRACK_FAILURE,

  MOVE_UP_PlAYLIST,
  MOVE_DOWN_PlAYLIST,
  REMOVE_FROM_PLAYLIST,
  INCREASE_VOTE,
  DECREASE_VOTE,
  REMOVE_TRACK,
  REMOVE_TRACK_SUCCESS,
  REMOVE_TRACK_FAILURE
} from '../actions/types';
import transformPlaylistData from './playlistsTransformer';

// could have an error attribute on each track object?

const defaultState = {
  playlist: [],
  error: null,
  loading: false
};

// rename to playlist
const playlistsReducer = (state = defaultState, action) => {
  let playlist = state.playlist;

  switch (action.type) {
    case FETCH_PLAYLIST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlist: transformPlaylistData(action.response), // could pass transformers to action and handle in middleware..
        error: null
      };
    case FETCH_PLAYLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case REORDER_TRACK:
        return {
          ...state,
          loading: true
        };
    case REORDER_TRACK_SUCCESS:
      // only move up within app if moved up successfully at spotify's end
      playlist.splice(
        action.insert_before,
        0,
        playlist.splice(action.range_start, 1)[0]
      );

      return {
          ...state,
          playlist,
          loading: false,
          error: null,
        };
    case REORDER_TRACK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      // case MOVE_UP_PlAYLIST:
      //   let curPlaylist = state.playlist;
      //   curPlaylist.splice(
      //     action.payload.insert_before,
      //     0,
      //     curPlaylist.splice(action.payload.range_start, 1)[0]
      //   );
      //   return {
      //     ...state,
      //     playlist: curPlaylist
      //   };
      // case MOVE_DOWN_PlAYLIST:
      //   let curPlaylist2 = state.playlist;
      //   curPlaylist2.splice(
      //     action.payload.insert_before,
      //     0,
      //     curPlaylist2.splice(action.payload.range_start, 1)[0]
      //   );
      // return {
      //   ...state,
      //   playlist: curPlaylist2
      // };
    case REMOVE_TRACK:
        return {
          ...state,
        }
    case REMOVE_TRACK_SUCCESS:
      // debugger;
      playlist.splice(action.position, 1);
      // debugger;

      return {
        ...state,
        playlist
      }
    case REMOVE_TRACK_FAILURE:

    // case REMOVE_FROM_PLAYLIST:
      // let currentPlaylist = state.playlist;
      // currentPlaylist.splice(action.payload, 1);
      // const newStatee = {
      //   ...state,
      //   playlist: currentPlaylist
      // };
      // return newStatee;
    case INCREASE_VOTE:
      const updatedPlaylist = state.playlist.map(el => {
        if (el.uri.valueOf() === action.payload.valueOf()) {
          return { ...el, votes: el.votes + 1 };
        }
        return el;
      });
      return {
        ...state,
        playlist: updatedPlaylist
      };
    case DECREASE_VOTE:
      const playlistWithVoteDescreased = state.playlist.map(el => {
        if (el.uri.valueOf() === action.payload.valueOf()) {
          return { ...el, votes: el.votes - 1 };
        }
        return el;
      });
      return {
        ...state,
        playlist: playlistWithVoteDescreased
      };
    case 'ADD_TO_PLAYLIST_SUCCESS':
      playlist.splice(action.position, 0, action.details);
      return {
        ...state,
        playlist: playlist,
        error: null,
      };
    case 'ADD_TO_PLAYLIST_FAILURE':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default playlistsReducer;
