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
  UPDATE_VOTE
} from '../actions/types';
import transformPlaylistData from './playlistsTransformer';

// could have an error attribute on each track object?

const defaultState = {
  playlist: [],
  newPlalist: [],
  playablePlaylist: [],
  lockedTrack: [],
  error: null,
  loading: false
};

// rename to playlist
const playlistsReducer = (state = defaultState, action) => {
  let playlist = state.playlist;
  let newPlalist = state.newPlalist;
  let playablePlaylist = state.playablePlaylist;
  let lockedTrack = state.lockedTrack;


  switch (action.type) {
    case FETCH_PLAYLIST:
      return {
        newPlalist: action.payload,
        // loading: true
      };
    case 'FETCH_PLAYLIST_FROM_DB_SUCCESS':
      return {
        ...state,
        newPlalist: action.payload,
        playablePlaylist: action.payload.filter(el => !el.locked), // TODO: 2 fetches to save mapping over?
        lockedTrack: action.payload.filter(el => el.locked),
      }
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
// TODO: maintian playlist with locked and unlocked track in state!!!!
// ---------------

// not re-ordering as locked track is included
      // tracl
    //   const item = newPlalist[action.payload.range_start]

    // // remove track
    // newPlalist.splice(action.payload.range_start,1)

    // // insert track
    // newPlalist.splice(action.payload.insert_before, 0, item);


    // TODO: not working
    playablePlaylist.splice(
        action.payload.insert_before,
        0,
        playablePlaylist.splice(action.payload.range_start, 1)[0]
      );

      return {
          ...state,
          playablePlaylist,
          loading: false,
          error: null,
        };

    case REMOVE_TRACK:
        return {
          ...state,
        }
    case REMOVE_TRACK_SUCCESS:
    console.log('remove track in first position')
    playablePlaylist.splice(action.payload, 1);

      return {
        ...state,
        playablePlaylist
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
    case UPDATE_VOTE:
      if (playablePlaylist.length === 0) {
        return {
          ...state,
        }
      }
        playablePlaylist[action.payload.position].votes += action.payload.change;
        playablePlaylist[action.payload.position].updatedAt = action.payload.updatedAt;
        const res =  {
          ...state,
          playablePlaylist
        }
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
    // case DECREASE_VOTE:
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

    case ADD_TO_PLAYLIST:
      if (playablePlaylist.length === 0) {
        return {
          ...state,
        }
      }
      playablePlaylist.splice(action.payload.position, 0, action.payload.track)
      return {
        ...state,
        playablePlaylist: playablePlaylist
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
    case 'UPDATE_TRACK_IN_DB_SUCCESS':
        playablePlaylist = playablePlaylist.map(el => {
        if (el.uri === action.payload.response.data.track.uri) {
          return action.payload.response.data.track
        }
        return el
      });

      if (action.payload.response.data.track.locked) {
        lockedTrack[0] = action.payload.response.data.track;
      }

      
      // playablePlaylist = playablePlaylist.filter(el => !el.removed || !el.locked)
      playablePlaylist = playablePlaylist.filter(el => !el.locked)
      return {
        ...state,
        playablePlaylist: playablePlaylist,
        lockedTrack:lockedTrack
      }
    default:
      return state;
  }
};

export default playlistsReducer;
