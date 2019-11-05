import spotifyApi from './api';
import { playlistId } from '../utils/constants';

export const reOrderTrackSpotify = (
  position,
  newPosition,
  offset,
  change,
  token
) => {
  const range_start = offset + position;
  let insert_before = offset + newPosition;

  if (change < 0) {
    insert_before += 1;
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

export const removeTrackFromSpotifyPlaylist = (uri, token) =>
  spotifyApi(token).delete(`playlists/${playlistId}/tracks`, {
    data: { tracks: [{ uri }] }
  });
