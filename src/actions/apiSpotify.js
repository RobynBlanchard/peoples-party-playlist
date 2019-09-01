import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import {
  REMOVE_TRACK,
  REMOVE_TRACK_SUCCESS,
  REMOVE_TRACK_FAILURE,
} from './types';



export const reOrderTrackSpotify = (
  position,
  newPosition,
  offset,
  change,
  token
) => {
  const range_start = offset + position;
  let insert_before = offset + newPosition + 1

  if (change === 1) {
    insert_before -= 1
  }

  return spotifyApi(token).put(`playlists/${playlistId}/tracks`, {
    range_start,
    insert_before
  });
};

export const addToSpotifyPlaylist = (uri, position, token) => {

  return spotifyApi(token).post(
    `playlists/${playlistId}/tracks?uris=${uri}&position=${position}`
  );
};

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
