import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  REMOVE_TRACK,
  REMOVE_TRACK_SUCCESS,
  REMOVE_TRACK_FAILURE,
  ADD_TO_SPOTIFY_PLAYLIST,
  ADD_TO_SPOTIFY_PLAYLIST_SUCCESS,
  ADD_TO_SPOTIFY_PLAYLIST_FAILURE,
  REORDER_TRACK_SPOTIFY,
  REORDER_TRACK_SPOTIFY_SUCCESS,
  REORDER_TRACK_SPOTIFY_FAILURE
} from './types';

const reOrderTrack = (range_start, insert_before) => ({
  types: [
    REORDER_TRACK_SPOTIFY,
    REORDER_TRACK_SPOTIFY_SUCCESS,
    REORDER_TRACK_SPOTIFY_FAILURE
  ],
  callAPI: token =>
    spotifyApi(token).put(`playlists/${playlistId}/tracks`, {
      range_start,
      insert_before
    }),
  payload: { range_start, insert_before: insert_before + 1 }
});

export const reOrderTrackSpotify = (position, newPosition, offset, change) => {
  const range_start = offset + position;
  const insert_before =
    change === 1 ? offset + newPosition : offset + newPosition - 1;

  return reOrderTrack(range_start, insert_before);
};

export const addToSpotifyPlaylist = (uri, position) => ({
  types: [
    ADD_TO_SPOTIFY_PLAYLIST,
    ADD_TO_SPOTIFY_PLAYLIST_SUCCESS,
    ADD_TO_SPOTIFY_PLAYLIST_FAILURE
  ],
  callAPI: token =>
    spotifyApi(token).post(
      `playlists/${playlistId}/tracks?uris=${uri}&position=${position}`
    ),
  payload: {
    position
  }
});

export const removeTrackFromSpotifyPlaylist = (uri, position) => ({
  types: [REMOVE_TRACK, REMOVE_TRACK_SUCCESS, REMOVE_TRACK_FAILURE],
  callAPI: token =>
    spotifyApi(token).delete(`playlists/${playlistId}/tracks`, {
      data: {
        tracks: [{ uri }]
      }
    }),
  payload: { position }
});
