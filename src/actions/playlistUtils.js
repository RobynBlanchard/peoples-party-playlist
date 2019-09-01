export const spotifyOffSet = (removedPlaylist, lockedTrack) => {
  return removedPlaylist.length + lockedTrack.length;
};

export const updatedTrackPosition = (playlist, track, change) => {
  if (playlist.length === 0) return 0;

  let newPosition = playlist.findIndex(el => {
    return el.votes < track.votes || el.updatedAt > track.updatedAt;
  });

  if (newPosition === -1) {
    newPosition = playlist.length
  }
  if (change === -1) {
    newPosition -= 1
  }

  return newPosition;
};
