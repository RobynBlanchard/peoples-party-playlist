import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLIST,
  MOVE_UP_PlAYLIST,
  INCREASE_VOTE,
  DECREASE_VOTE
} from '../actions/types';

const defaultState = {
  playlists: [],
  playlist: null,
  playlistInfoWithVotes: {}
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
        const artists = el.track.artists.map(el => el.name);
        return {
          uri: el.track.uri,
          votes: 0,
          name: el.track.name,
          artist: artists.join(','),
          id: el.track.id
        };
      });
      return {
        ...state,
        playlist: action.payload,
        playlistInfoWithVotes: playlistWithResetVotes
      };
    case MOVE_UP_PlAYLIST:
      let curPlaylist = state.playlistInfoWithVotes;
      curPlaylist.splice(
        action.payload.insert_before,
        0,
        curPlaylist.splice(action.payload.range_start, 1)[0]
        );
      return {
        ...state,
        playlist: action.payload,
        playlistInfoWithVotes: curPlaylist
      };
    case INCREASE_VOTE:
      const updatedPlaylist = state.playlistInfoWithVotes.map(el => {
        if (el.id.valueOf() === action.payload.valueOf()) {
          return { ...el, votes: el.votes + 1 };
        }
        return el;
      });
      return {
        ...state,
        playlist: action.payload,
        playlistInfoWithVotes: updatedPlaylist
      };
    case DECREASE_VOTE:
      const playlistWithVoteDescreased = state.playlistInfoWithVotes.map(el => {
        if (el.id.valueOf() === action.payload.valueOf()) {
          return { ...el, votes: el.votes - 1 };
        }
        return el;
      });
      return {
        ...state,
        playlist: action.payload,
        playlistInfoWithVotes: playlistWithVoteDescreased
      };
    default:
      return state;
  }
};

export default playlistsReducer;
