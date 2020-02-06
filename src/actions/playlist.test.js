import { updateTrackNumOfVotes, addToPlaylist, removeTrack } from './playlist';
import {
  addToPlaylistApi,
  removeFromPlaylistApi,
  updateTrackApi
} from './utils/playlistUtils'
import * as playlistUtils from './utils/playlistUtils'
import {
  UPDATE_TRACK,
  UPDATE_TRACK_SUCCESS,
  UPDATE_TRACK_FAILURE,
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE,
  DELETE_TRACK,
  DELETE_TRACK_SUCCESS,
  DELETE_TRACK_FAILURE,
  ADD_TO_PLAYLIST_DISALLOWED
} from './types';

describe('playlist actions', () => {
  const topTrack = { uri: '3', votes: 4 };
  const middleTrack = { uri: '4', votes: 3 };
  const bottomTrack = { uri: '5', votes: -1 };
  const tracks = [topTrack, middleTrack, bottomTrack];
  const removedPlaylist = [{ uri: '1', votes: 10 }];
  const lockedTrack = [{ uri: '2', votes: 8 }];
  const userId = 'a1';

  const initialState = {
    playlist: {
      tracks,
      removedPlaylist,
      lockedTrack
    },
    appUser: {
      userId
    }
  };

  const apiToken = '123';

  describe('updateTrackNumOfVotes', () => {
    let dispatch, getState;
    const mockNewPosition = 0;
    const mockSpotifyOffset = 2;
    const newVotes = 5;
    const originalPosition = 1;
    const votesByUser = 2;

    const updatedTrack = {
      uri: middleTrack.uri,
      votes: newVotes
    };
    beforeEach(() => {
      dispatch = jest.fn();
      getState = jest.fn(() => initialState);

      playlistUtils.updatedTrackNewPosition = jest.fn(() => mockNewPosition);
      playlistUtils.spotifyOffSet = jest.fn(() => mockSpotifyOffset);
      playlistUtils.updatedTrackVotes = jest.fn(() => updatedTrack);
    });

    it('dispatches update track actions', () => {
      updateTrackNumOfVotes(originalPosition, newVotes)(dispatch, getState);

      expect(playlistUtils.updatedTrackVotes).toHaveBeenCalledWith(
        middleTrack,
        newVotes,
        votesByUser,
        userId
      );
      expect(playlistUtils.updatedTrackNewPosition).toHaveBeenCalledWith(
        tracks,
        updatedTrack,
        newVotes
      );

      expect(playlistUtils.spotifyOffSet).toHaveBeenCalledWith(
        removedPlaylist,
        lockedTrack
      );

      const dispatchArgs = dispatch.mock.calls[0][0];

      expect(dispatchArgs.payload).toEqual({
        position: originalPosition,
        newPosition: mockNewPosition,
        track: updatedTrack
      });
      expect(dispatchArgs.types).toEqual([
        UPDATE_TRACK,
        UPDATE_TRACK_SUCCESS,
        UPDATE_TRACK_FAILURE
      ]);
      expect(dispatchArgs.requiresAuth).toEqual(true);
      expect(dispatchArgs.callAPI(apiToken)).toEqual(
        updateTrackApi(
          apiToken,
          originalPosition,
          mockNewPosition,
          updatedTrack,
          mockSpotifyOffset
        )
      );
    });
  });

  describe('addToPlaylist', () => {
    let dispatch, getState;
    beforeEach(() => {
      dispatch = jest.fn();
      getState = jest.fn(() => initialState);
    });
    describe('when the track is already on the playlist', () => {
      it('dispatches add to playlist disallowed action', () => {
        const uri = topTrack.uri;
        const name = 'Do I wanna know?';
        const artist = 'arctic monkeys';
        const positionInSearch = 2;

        addToPlaylist(uri, name, artist, positionInSearch)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({
          type: ADD_TO_PLAYLIST_DISALLOWED,
          payload: positionInSearch
        });
      });
    });

    describe('when the track is not already on the playlist', () => {
      const uri = '6';
      const name = 'Go your own way';
      const artist = 'Fleetwood mac';
      const positionInSearch = 2;
      const mockNewPosition = 2;
      const mockSpotifyOffset = 2;
      const addToPlaylistIncrement = 1;

      let mockDateNow;
      beforeEach(() => {
        mockDateNow = new Date('2019');
        global.Date = jest.fn(() => mockDateNow);

        playlistUtils.updatedTrackNewPosition = jest.fn(() => mockNewPosition);
        playlistUtils.spotifyOffSet = jest.fn(() => mockSpotifyOffset);
      });

      it('dispatches add to playlist actions', () => {
        addToPlaylist(uri, name, artist, positionInSearch)(dispatch, getState);

        const expectedTrack = {
          artist,
          name,
          votes: 0,
          uri,
          updatedAt: mockDateNow.toISOString()
        };

        expect(playlistUtils.updatedTrackNewPosition).toHaveBeenCalledWith(
          tracks,
          expectedTrack,
          addToPlaylistIncrement
        );
        expect(playlistUtils.spotifyOffSet).toHaveBeenCalledWith(
          removedPlaylist,
          lockedTrack
        );

        const dispatchArgs = dispatch.mock.calls[0][0];

        expect(dispatchArgs.payload).toEqual({
          position: mockNewPosition,
          positionInSearch,
          track: expectedTrack
        });
        expect(dispatchArgs.types).toEqual([
          ADD_TO_PLAYLIST,
          ADD_TO_PLAYLIST_SUCCESS,
          ADD_TO_PLAYLIST_FAILURE
        ]);
        expect(dispatchArgs.requiresAuth).toEqual(true);
        expect(dispatchArgs.callAPI(apiToken)).toEqual(
          addToPlaylistApi(
            apiToken,
            mockNewPosition + mockSpotifyOffset,
            expectedTrack
          )
        );
      });
    });
  });

  describe('removeTrack', () => {
    let dispatch, getState;
    beforeEach(() => {
      dispatch = jest.fn();
      getState = jest.fn(() => initialState);
    });

    it('dispatches delete track actions', () => {
      const uri = bottomTrack.uri;
      const position = 2;

      removeTrack(uri, position)(dispatch, getState);

      const dispatchArgs = dispatch.mock.calls[0][0];

      expect(dispatchArgs.payload).toEqual({
        position,
        uri
      });

      expect(dispatchArgs.callAPI(apiToken)).toEqual(
        removeFromPlaylistApi(apiToken, 3)
      );

      expect(dispatchArgs.types).toEqual([
        DELETE_TRACK,
        DELETE_TRACK_SUCCESS,
        DELETE_TRACK_FAILURE
      ]);
      expect(dispatchArgs.requiresAuth).toEqual(true);
    });
  });
});
