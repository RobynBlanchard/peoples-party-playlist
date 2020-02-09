import spotifyApi from './api';
import { playlistId } from '../../utils/constants';

export const reOrderTrackSpotify = (range_start, insert_before, token) => {
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

export const resumePlaybackSpotify = (
  token,
  positionInPlaylist,
  playbackPosition
) => {
  return spotifyApi(token).put('me/player/play', {
    context_uri: `spotify:playlist:${playlistId}`,
    offset: { position: positionInPlaylist },
    position_ms: playbackPosition
  });
};

export const pausePlaybackSpotify = token =>
  spotifyApi(token).put('me/player/pause');

export const getCurrentlyPlayingSpotify = token =>
  spotifyApi(token).get('me/player/currently-playing');

// TODO:
// class Spotify {
//   constructor(playlistId) {
//     this.playlistId = playlistId;
// this.api =

//   }
// }
