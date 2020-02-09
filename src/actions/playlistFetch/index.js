import axios from 'axios';
import {
  FETCH_PLAYLIST_FROM_DB,
  FETCH_PLAYLIST_FROM_DB_SUCCESS,
  FETCH_PLAYLIST_FROM_DB_FAILURE
} from '../types';

export const fetchPlaylist = () => ({
  types: [
    FETCH_PLAYLIST_FROM_DB,
    FETCH_PLAYLIST_FROM_DB_SUCCESS,
    FETCH_PLAYLIST_FROM_DB_FAILURE
  ],
  callAPI: () => axios.get('/api/v1/playlist/tracks')
});
