import { combineReducers } from 'redux';
import playlistReducer from './playlistReducer';
import playbackReducer from './playbackReducer';
import searchReducer from './searchReducer';
import authentication from './authentication';
import user from './user';
import appUser from './appUser';

const reducer = combineReducers({
  auth: authentication,
  user: user,
  appUser: appUser,
  playlist: playlistReducer,
  playback: playbackReducer,
  search: searchReducer,
});

export default reducer;
