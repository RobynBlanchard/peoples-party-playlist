import { createStore, combineReducers, applyMiddleware } from 'redux';
// import authReducer from './authReducer';
import playlistsReducer from './playlistsReducer';
import playlistssReducer from './playlistssReducer';
import playbackReducer from './playbackReducer';
import searchReducer from './searchReducer';
import sessionReducer from './sessionReducer';
import authentication from './authentication';
import user from './user';


const reducer = combineReducers( {
  // auth: authReducer,
  auth: authentication,
  user: user,
  playlists: playlistsReducer,
  playlistss: playlistssReducer,
  playback: playbackReducer,
  search: searchReducer,
  session: sessionReducer,
} );

export default reducer;