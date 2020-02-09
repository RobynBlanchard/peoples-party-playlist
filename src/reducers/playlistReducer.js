import {
  FETCH_PLAYLIST_FROM_DB,
  FETCH_PLAYLIST_FROM_DB_SUCCESS,
  FETCH_PLAYLIST_FROM_DB_FAILURE,
  ADD_TO_PLAYLIST_SUCCESS,
  DELETE_TRACK,
  DELETE_TRACK_SUCCESS,
  DELETE_TRACK_FAILURE,
  UPDATE_TRACK,
  UPDATE_TRACK_SUCCESS,
  UPDATE_TRACK_FAILURE,
  UPVOTE_LIMIT_EXCEEDED,
  DOWNVOTE_LIMIT_EXCEEDED,
  UPDATE_CURRENT_TRACK_SUCCESS,
  RESUME_PLAYBACK_SUCCESS
} from '../actions/types';
import { upVoteLimit, downVoteLimit } from '../utils/constants';

const defaultState = {
  removedPlaylist: [],
  tracks: [],
  lockedTrack: [],
  error: null,
  loading: false,
  trackError: null,
  lastClickedTrack: {
    error: null,
    loading: false,
    position: null
  }
};

const sortTrackStatuses = fetchedTracks =>
  fetchedTracks.reduce(
    (acc, track) => {
      if (track.removed) {
        return { ...acc, removedPlaylist: [...acc.removedPlaylist, track] };
      }
      if (track.locked && !track.removed) {
        return { ...acc, lockedTrack: [...acc.lockedTrack, track] };
      }
      return { ...acc, tracks: [...acc.tracks, track] };
    },
    { tracks: [], lockedTrack: [], removedPlaylist: [] }
  );

const updateAtIndex = (arr, itemIndex, updatedItem) => {
  return arr.map((item, index) => {
    if (index === itemIndex) {
      return updatedItem;
    }
    return item;
  });
};

const insertAtIndex = (arr, index, item) => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index)
];

const removeAtIndex = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1)
];

const updateAndMoveIndex = (arr, oldPos, newPos, updatedItem) => {
  const arrWithItemRemoved = removeAtIndex(arr, oldPos);

  return insertAtIndex(arrWithItemRemoved, newPos, updatedItem);
};

const playlistReducer = (state = defaultState, action) => {
  const oldTracks = state.tracks;
  const oldLockedTrack = state.lockedTrack;
  const oldRemovedPlaylist = state.removedPlaylist;

  let newLockedTrack;
  let newRemovedTracks;
  let newTracks;
  let status;
  let message;

  switch (action.type) {
    case FETCH_PLAYLIST_FROM_DB:
      return {
        ...state,
        loading: true
      };
    case FETCH_PLAYLIST_FROM_DB_SUCCESS:
      const fetchedTracks = action.payload.response.data.tracks;
      const { tracks, lockedTrack, removedPlaylist } = sortTrackStatuses(
        fetchedTracks
      );

      return {
        ...state,
        loading: false,
        tracks,
        lockedTrack,
        removedPlaylist
      };
    case FETCH_PLAYLIST_FROM_DB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case DELETE_TRACK:
      return {
        ...state,
        lastClickedTrack: {
          error: null,
          loading: true,
          position: action.payload.position
        }
      };

    case DELETE_TRACK_SUCCESS:
      newTracks = removeAtIndex(oldTracks, action.payload.position);

      return {
        ...state,
        tracks: newTracks,
        lastClickedTrack: {
          error: null,
          loading: false,
          position: null
        }
      };
    case DELETE_TRACK_FAILURE:
      ({ status, message } = action.payload.error.response.data.error);

      return {
        ...state,
        lastClickedTrack: {
          error: {
            status,
            message,
            displayMessage: 'could not delete track at this time'
          },
          loading: false,
          position: action.payload.position
        }
      };
    case ADD_TO_PLAYLIST_SUCCESS:
      newTracks = insertAtIndex(
        oldTracks,
        action.payload.position,
        action.payload.track
      );

      return {
        ...state,
        tracks: newTracks
      };
    case UPDATE_TRACK:
      return {
        ...state,
        lastClickedTrack: {
          error: null,
          loading: true,
          position: action.payload.position
        }
      };

    case UPDATE_TRACK_SUCCESS:
      if (action.payload.position !== action.payload.newPosition) {
        newTracks = updateAndMoveIndex(
          oldTracks,
          action.payload.position,
          action.payload.newPosition,
          action.payload.track
        );
      } else {
        newTracks = updateAtIndex(
          oldTracks,
          action.payload.position,
          action.payload.track
        );
      }

      return {
        ...state,
        tracks: newTracks,
        lastClickedTrack: {
          error: null,
          loading: false,
          position: action.payload.newPosition
        }
      };
    case UPDATE_TRACK_FAILURE:
      ({ status, message } = action.payload.error.response.data.error);
      return {
        ...state,
        lastClickedTrack: {
          position: action.payload.position,
          error: {
            status,
            message,
            displayMessage: 'could not update track at this time'
          }
        }
      };
    case UPVOTE_LIMIT_EXCEEDED:
      return {
        ...state,
        lastClickedTrack: {
          position: action.payload,
          error: {
            status: '',
            message: '',
            displayMessage: `cannot upvote more than ${upVoteLimit} times on a track!`
          }
        }
      };
    case DOWNVOTE_LIMIT_EXCEEDED:
      return {
        ...state,
        lastClickedTrack: {
          position: action.payload,
          error: {
            status: '',
            message: '',
            displayMessage: `cannot downvote more than ${downVoteLimit} times on a track!`
          }
        }
      };

    case UPDATE_CURRENT_TRACK_SUCCESS:
      if (oldLockedTrack.length > 0) {
        // move locked track to removed
        newRemovedTracks = oldRemovedPlaylist.concat({
          ...oldLockedTrack[0],
          removed: true
        });
        // remove old lockedTrack from lockedTracks
        newLockedTrack = removeAtIndex(oldLockedTrack, 0);
      }

      if (oldTracks.length > 0) {
        // move top track to locked
        newLockedTrack = [{ ...oldTracks[0], locked: true }];

        // remove top track from tracks
        newTracks = removeAtIndex(oldTracks, 0);
      }

      return {
        ...state,
        lockedTrack: newLockedTrack || [...oldLockedTrack],
        tracks: newTracks || [...oldTracks],
        removedPlaylist: newRemovedTracks || [...oldRemovedPlaylist]
      };
    case RESUME_PLAYBACK_SUCCESS:
      // playlist has never been played
      // -> lock top track
      if (oldLockedTrack.length === 0) {
        // move top track to locked
        newLockedTrack = [{ ...oldTracks[0], locked: true }];

        // remove top track from tracks
        newTracks = removeAtIndex(oldTracks, 0);
        return {
          ...state,
          lockedTrack: newLockedTrack,
          tracks: newTracks
        };
      }
      return {
        ...state
      };
    default:
      return state;
  }
};

export default playlistReducer;
