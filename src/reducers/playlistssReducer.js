import { FETCH_PLAYLISTS } from '../actions/types';

const defaultState = {
  playlists: []
};

const playlistssReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload.items
      };

    default:
      return state;
  }
};

export default playlistssReducer;
