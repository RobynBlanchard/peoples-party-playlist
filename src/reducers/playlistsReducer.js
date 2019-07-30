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
  REMOVE_TRACK_FAILURE,
  ADD_TO_SPOTIFY_PLAYLIST,
  ADD_TO_SPOTIFY_PLAYLIST_SUCCESS,
  ADD_TO_SPOTIFY_PLAYLIST_FAILURE,
  REORDER_TRACK_SPOTIFY,
  REORDER_TRACK_SPOTIFY_SUCCESS,
  REORDER_TRACK_SPOTIFY_FAILURE,
} from '../actions/types';
import transformPlaylistData from './playlistsTransformer';

// could have an error attribute on each track object?

const defaultState = {
  playlist: [],
  newPlalist: [],
  error: null,
  loading: false
};

// rename to playlist
const playlistsReducer = (state = defaultState, action) => {
  let playlist = state.playlist;
  let newPlalist = state.newPlalist;

  console.log(state)


  switch (action.type) {
    case FETCH_PLAYLIST:
      return {
        newPlalist: action.payload,
        // loading: true
      };
    // case FETCH_PLAYLIST_SUCCESS:
    //   return {
    //     ...state,
    //     playlist: transformPlaylistData(action.response), // could pass transformers to action and handle in middleware..
    //     error: null
    //   };
    // case FETCH_PLAYLIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    case REORDER_TRACK:
      newPlalist.splice(
        action.payload.insert_before,
        0,
        newPlalist.splice(action.payload.range_start, 1)[0]
      );

      return {
          ...state,
          newPlalist,
          loading: false,
          error: null,
        };

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
      if (newPlalist.length === 0) {
        return {
          ...state,
        }
      }
      debugger;
        newPlalist[action.payload.position].votes += 1;

        console.log('NEW PL', newPlalist)
        const res =  {
          ...state,
          newPlalist
        }
        debugger;
        return res;

      // const updatedPlaylist = state.playlist.map(el => {
      //   if (el.uri.valueOf() === action.payload.valueOf()) {
      //     return { ...el, votes: el.votes + 1 };
      //   }
      //   return el;
      // });
      // return {
      //   ...state,
      //   playlist: updatedPlaylist
      // };
    case DECREASE_VOTE:
      // const playlistWithVoteDescreased = state.playlist.map(el => {
      //   if (el.uri.valueOf() === action.payload.valueOf()) {
      //     return { ...el, votes: el.votes - 1 };
      //   }
      //   return el;
      // });
      // return {
      //   ...state,
      //   playlist: playlistWithVoteDescreased
      // };

    case 'PLAYLIST':
      return {
        ...state,
        newPlalist: action.payload
      }
    case 'ADD_TO_PLAYLIST':
      if (newPlalist.length === 0) {
        return {
          ...state,
        }
      }
      newPlalist.splice(action.payload.position, 0, action.payload.track)
      return {
        ...state,
        newPlalist: newPlalist
      }
    // TODO: handle these properly
    // could indicate on track just clicked when track has been added
    case ADD_TO_SPOTIFY_PLAYLIST:
      return {
        ...state,
      }
    case ADD_TO_SPOTIFY_PLAYLIST_SUCCESS:
      return {
        ...state
      }
    case ADD_TO_SPOTIFY_PLAYLIST_FAILURE:
      return {
        ...state
      }
    case REORDER_TRACK_SPOTIFY:
        return {
          ...state,
        }
    case REORDER_TRACK_SPOTIFY_SUCCESS:
      return {
        ...state
      }
    case REORDER_TRACK_SPOTIFY_FAILURE:
      return {
        ...state
      }
    default:
      return state;
  }
};

export default playlistsReducer;
