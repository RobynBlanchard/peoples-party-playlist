import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from './authReducer';
import playlistsReducer from './playlistsReducer';
import playbackReducer from './playbackReducer';
import searchReducer from './searchReducer';
import sessionReducer from './sessionReducer';

const reducer = combineReducers( {
  auth: authReducer,
  playlists: playlistsReducer,
  playback: playbackReducer,
  search: searchReducer,
  session: sessionReducer,
} );

export default reducer;