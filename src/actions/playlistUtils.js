export const spotifyOffSet = (removedPlaylist, lockedTrack) => {
  return removedPlaylist.length + lockedTrack.length;
};

export const updatedTrackPosition = (playlist, track, change) => {
  let positionBeforeAmendments = playlist.findIndex(el => {
    return el.votes < track.votes;
  });

  if (positionBeforeAmendments === -1) {
    return playlist.length - 1;
  } else {
    if (change === -1) {
      // don't include track itself when working out position
      return (positionBeforeAmendments -= 1);
    }
    return positionBeforeAmendments;
  }
};