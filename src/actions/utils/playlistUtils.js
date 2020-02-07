import {
  addToSpotifyPlaylist,
  removeTrackFromSpotifyPlaylist,
  reOrderTrackSpotify
} from './apiSpotify';
import { addTrackToDb, updateTrackDb, removeTrackFromDb } from './apiDb';

export const spotifyOffSet = (removedPlaylist, lockedTrack) => {
  return removedPlaylist.length + lockedTrack.length;
};

export const updatedTrackNewPosition = (playlist, updatedTrack, change) => {
  let newPosition = playlist.findIndex(el => {
    // el.updatedAt > track.updatedAt will always be true ?
    return (
      el.votes < updatedTrack.votes || el.updatedAt > updatedTrack.updatedAt
    );
  });

  if (newPosition === -1) {
    return playlist.length - 1;
  }

  if (change < 1) {
    return (newPosition -= 1);
  }

  return newPosition;
};

// todo change updatedAt logic when downvote
export const findPositionForNewTrack = (playlist, newTrack) => {
  if (playlist.length === 0) return 0;

  const newTrackDefaultNumberOfVotes = 0;

  // const newPosition = playlist.findIndex(
  //   el => el.votes < newTrack.votes || el.updatedAt > newTrack.updatedAt
  // );

  const newPosition = playlist.findIndex(
    el => el.votes < newTrackDefaultNumberOfVotes
  );


  if (newPosition === -1) {
    return playlist.length;
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

  console.log('old pos', oldPosition);
  console.log('newPositions', newPosition);

  const updateTrack = () =>
    updateTrackDb(uri, {
      $set: {
        votes: votes,
        updatedAt: updatedAt,
        upVoters: upVoters,
        downVoters: downVoters
      }
    });

    // TODO: move this to reOrderTrackSpotify
  if (oldPosition !== newPosition) {
    const rangeStart = offset + oldPosition;
    const insertBefore =
      newPosition > oldPosition
        ? offset + newPosition + 1
        : offset + newPosition;

    console.log('rangeStart', oldPosition);
    console.log('insertBefore', newPosition);

    return reOrderTrackSpotify(rangeStart, insertBefore, token).then(() =>
      updateTrack()
    );
  } else {
    return updateTrack();
  }
};

export const updatedTrackVotes = (
  selectedTrack,
  votes,
  votesByPerson,
  userId
) => {
  const upVotesByUser = selectedTrack.upVoters[userId] || 0;
  const downVotesByUser = selectedTrack.downVoters[userId] || 0;

  // if add don't add votes

  return {
    ...selectedTrack,
    votes: votes,
    updatedAt: new Date().toISOString(),
    upVoters: {
      ...selectedTrack.upVoters,
      [userId]:
        votesByPerson > 0 ? upVotesByUser + votesByPerson : upVotesByUser
    },
    downVoters: {
      ...selectedTrack.downVoters,
      [userId]:
        votesByPerson < 0 ? downVotesByUser - votesByPerson : downVotesByUser
    }
  };
};
