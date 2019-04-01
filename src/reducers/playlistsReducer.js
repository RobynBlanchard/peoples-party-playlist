const defaultState = {
  playlists: [],
  playlist: null,
};

const playlistsReducer = (state = defaultState, action) => {
  console.log('state', state)

  switch (action.type) {
    case 'FETCH_PLAYLISTS':
      return {
        ...state,
        playlists: action.payload.items
      };

    case 'FETCH_PLAYLIST':
      return {
        ...state,
        playlist: action.payload
      };
    default:
      return state;
  }
};

export default playlistsReducer;
