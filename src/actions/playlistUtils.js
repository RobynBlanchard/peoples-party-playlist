export const spotifyOffSet = (removedPlaylist, lockedTrack) => {
  return removedPlaylist.length + lockedTrack.length;
};

export const updatedTrackPosition = (playlist, track, change) => {
  let newPosition = playlist.findIndex(el => {
    return el.votes < track.votes;
  });

  if (newPosition === -1) {
    return playlist.length - 1;
  } else {
    if (change === -1) {
      // don't include track itself when working out position
      return (newPosition -= 1);
    }
    return newPosition;
  }
};