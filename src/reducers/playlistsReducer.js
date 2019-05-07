import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLIST,
  MOVE_UP_PlAYLIST,
  MOVE_DOWN_PlAYLIST,
  REMOVE_FROM_PLAYLIST,
  INCREASE_VOTE,
  DECREASE_VOTE
} from '../actions/types';
import transformPlaylistData from './playlistsTransformer';

const defaultState = {
  playlists: [],
  playlist: []
};

const playlistsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload.items
      };

    case FETCH_PLAYLIST:
      const playlistWithResetVotes = action.payload.tracks.items.map(el => {
        return transformPlaylistData(el);
      });
      return {
        ...state,
        playlist: playlistWithResetVotes
      };
    case MOVE_UP_PlAYLIST:
      debugger;
      let curPlaylist = state.playlist;
      curPlaylist.splice(
        action.payload.insert_before,
        0,
        curPlaylist.splice(action.payload.range_start, 1)[0]
      );
      return {
        ...state,
        playlist: curPlaylist
      };
    case MOVE_DOWN_PlAYLIST:
      let curPlaylist2 = state.playlist;
      curPlaylist2.splice(
        action.payload.insert_before,
        0,
        curPlaylist2.splice(action.payload.range_start, 1)[0]
      );
      return {
        ...state,
        playlist: curPlaylist2
      };
    case REMOVE_FROM_PLAYLIST:
      let currentPlaylist = state.playlist;
      currentPlaylist.splice(action.payload, 1);
      const newStatee = {
        ...state,
        playlist: currentPlaylist
      };
      return newStatee;
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
    case 'ADD_TO_PLAYLIST':
      let oldPlaylist = state.playlist;
      oldPlaylist.splice(action.payload.position, 0, action.payload.details);
      return {
        ...state,
        playlist: oldPlaylist
      };
    default:
      return state;
  }
};

export default playlistsReducer;
