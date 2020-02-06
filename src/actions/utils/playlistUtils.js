import {
  addToSpotifyPlaylist,
  removeTrackFromSpotifyPlaylist,
  reOrderTrackSpotify
} from './apiSpotify';
import { addTrackToDb, updateTrackDb, removeTrackFromDb } from './apiDb';

export const spotifyOffSet = (removedPlaylist, lockedTrack) => {
  return removedPlaylist.length + lockedTrack.length;
};

export const updatedTrackNewPosition = (playlist, track, change) => {
  if (playlist.length === 0) return 0;

  let newPosition = playlist.findIndex(el => {
    // el.updatedAt > track.updatedAt will always be true ?
    return el.votes < track.votes || el.updatedAt > track.updatedAt;
  });

  if (newPosition === -1) {
    return playlist.length;
  }

  if (change < 1) {
    return newPosition -= 1;
  }

  return newPosition;
};

export const addToPlaylistApi = (token, position, track) => {
  const { uri, name, artist, updatedAt } = track;

  return addToSpotifyPlaylist(uri, position, token).then(() =>
    addTrackToDb(uri, name, artist, updatedAt)
  );
};

export const removeFromPlaylistApi = (token, uri) => {
  return removeTrackFromSpotifyPlaylist(uri, token).then(() =>
    removeTrackFromDb(uri)
  );
};

export const updateTrackApi = (
  token,
  oldPosition,
  newPosition,
  updatedTrack,
  offset
) => {
  const { updatedAt, upVoters, downVoters, uri, votes } = updatedTrack;

  const updateTrack = updateTrackDb(uri, {
    $set: {
      votes: votes,
      updatedAt: updatedAt,
      upVoters: upVoters,
      downVoters: downVoters
    }
  });

  if (oldPosition !== newPosition) {
    const rangeStart = offset + oldPosition;
    const insertBefore =
      newPosition > oldPosition
        ? offset + newPosition + 1
        : offset + newPosition;

    reOrderTrackSpotify(rangeStart, insertBefore, token).then(() =>
      updateTrack()
    );
  } else {
    return updatedTrack();
  }
};

export const updatedTrackVotes = (
  selectedTrack,
  votes,
  votesByPerson,
  userId
) => {
  const upVotesByUser = selectedTrack.upVoters[userId];
  const downVotesByUser = selectedTrack.downVoters[userId];

  return {
    ...selectedTrack,
    votes: votes,
    updatedAt: new Date().toISOString(),
    upVoters: {
      ...selectedTrack.upVoters,
      [userId]: votesByPerson > 0 ? (upVotesByUser || 0) + votes : upVotesByUser
    },
    downVoters: {
      ...selectedTrack.downVoters,
      [userId]:
        votesByPerson < 0 ? (downVotesByUser || 0) - votes : downVotesByUser
    }
  };
};
