import { combineReducers } from 'redux';
import playlistsReducer from './playlistsReducer';
import playbackReducer from './playbackReducer';
import searchReducer from './searchReducer';
import sessionReducer from './sessionReducer';
import authentication from './authentication';
import user from './user';

const reducer = combineReducers({
  auth: authentication,
  user: user,
  playlists: playlistsReducer,
  playback: playbackReducer,
  search: searchReducer,
  session: sessionReducer
});

export default reducer;
