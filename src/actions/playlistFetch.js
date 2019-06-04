import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
  FETCH_PLAYLIST,
} from './types';

export const fetchPlaylist = () => ({
  types: [FETCH_PLAYLIST, FETCH_PLAYLIST_SUCCESS, FETCH_PLAYLIST_FAILURE],
  shouldCallAPI: state => state.playlists.playlist,
  callAPI: token => spotifyApi(token).get(`playlists/${playlistId}`),
});