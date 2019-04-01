import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from './authReducer';
import playlistsReducer from './playlistsReducer';

const reducer = combineReducers( {
  auth: authReducer,
  playlists: playlistsReducer,
} );

export default reducer;