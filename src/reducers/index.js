import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from './authReducer';
import playlistsReducer from './playlistsReducer';
import playbackReducer from './playbackReducer';

const reducer = combineReducers( {
  auth: authReducer,
  playlists: playlistsReducer,
  playback: playbackReducer,
} );

export default reducer;