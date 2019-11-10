import { addToSpotifyPlaylist } from './apiSpotify';
import { addTrackToDb } from './apiDb';

export const spotifyOffSet = (removedPlaylist, lockedTrack) => {
  return removedPlaylist.length + lockedTrack.length;
};

export const updatedTrackNewPosition = (playlist, track, change) => {
  if (playlist.length === 0) return 0;

  let newPosition = playlist.findIndex(el => {
    return el.votes < track.votes || el.updatedAt > track.updatedAt;
  });

  if (newPosition === -1) {
    newPosition = playlist.length;
  }

  if (change < 1) {
    newPosition -= 1;
  }

  return newPosition;
};

export const addToPlaylistApi = (token, position, track) => {
  const { uri, name, artist, updatedAt } = track;

  return addToSpotifyPlaylist(uri, position, token).then(() =>
    addTrackToDb(uri, name, artist, updatedAt)
  );
};
