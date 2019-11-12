import { updateTrackNumOfVotes, addToPlaylist, removeTrack } from "./playlist";
import {
  addToPlaylistApi,
  removeFromPlaylistApi,
  updateTrackApi,
  updatedTrackVotes,
  updatedTrackNewPosition,
  spotifyOffSet
} from "./playlistUtils";
import * as playlistUtils from "./playlistUtils";

describe("playlist actions", () => {
  describe("updateTrackNumOfVotes", () => {
    const trackOne = { uri: "abc", votes: 1 };
    const trackTwo = { uri: "def", votes: 0 };
    const tracks = [trackOne, trackTwo];
    const userId = '123';
    const mockNewPosition = 0;
    const mockSpotifyOffset = 0;
    const mockUpdateTrackTwo = { uri: "def", votes: 2 };
    const trackTwoNewVotes = 2;

    const initialState = {
      appUser: { userId },
      playlist: { tracks },
      removedPlaylist: [],
      lockedTrack: []
    };

    let dispatch, getState;
    beforeEach(() => {
      (dispatch = jest.fn()), (getState = jest.fn(() => initialState));
      playlistUtils.updatedTrackVotes = jest.fn(() => mockUpdateTrackTwo);
      playlistUtils.updatedTrackNewPosition = jest.fn(() => mockNewPosition);
      playlistUtils.spotifyOffSet = jest.fn(() => mockSpotifyOffset);
    });

    it("dispatches update track actions", () => {
      const position = 1;
      updateTrackNumOfVotes(position, trackTwoNewVotes)(dispatch, getState);

      expect(updatedTrackVotes).toHaveBeenCalledWith(
        trackTwo,
        trackTwoNewVotes,
        2,
        userId
      );

      expect(updatedTrackNewPosition).toHaveBeenCalledWith(tracks, mockUpdateTrackTwo, trackTwoNewVotes)

      const dispatchArgs = dispatch.mock.calls[0][0];

      expect(dispatchArgs.payload).toEqual({
        position: 1,
        newPosition: 0,
        track: { uri: "def", votes: 2 }
      });
      expect(dispatchArgs.callAPI("123")).toEqual(
        updateTrackApi("123", 0, 1, { uri: "def", votes: 2 }, 0)
      );
      expect(dispatchArgs.types).toEqual([
        "UPDATE_TRACK",
        "UPDATE_TRACK_SUCCESS",
        "UPDATE_TRACK_FAILURE"
      ]);
      expect(dispatchArgs.requiresAuth).toEqual(true);
    });
  });

  describe("addToPlaylist", () => {
    const removedPlaylist = [{ uri: "111", votes: 10 }];
    const lockedTrack = [{ uri: "222", votes: 8 }];
    const tracks = [
      { uri: "123", votes: 4 },
      { uri: "456", votes: 3 },
      { uri: "678", votes: -1 }
    ];

    const initialState = {
      playlist: {
        tracks,
        removedPlaylist,
        lockedTrack
      }
    };

    let dispatch, getState;
    beforeEach(() => {
      (dispatch = jest.fn()), (getState = jest.fn(() => initialState));
      playlistUtils.updatedTrackNewPosition = jest.fn(() => 2); // to mock or not to mock ?
    });

    describe("when the track is already on the playlist", () => {
      it("dispatches add to playlist disallowed", () => {
        const uri = "123";
        const name = "Do I wanna know?";
        const artist = "arctic monkeys";
        const positionInSearch = 2;

        addToPlaylist(uri, name, artist, positionInSearch)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({
          type: "ADD_TO_PLAYLIST_DISALLOWED",
          payload: 2
        });
      });
    });

    describe("when the track is not already on the playlist", () => {
      const uri = "912";
      const name = "Go your own way";
      const artist = "Fleetwood mac";
      const positionInSearch = 2;
      let mockDateNow;
      beforeEach(() => {
        mockDateNow = new Date("2019");
        global.Date = jest.fn(() => mockDateNow);
      });
      it("dispatches add to playlist actions", () => {
        addToPlaylist(uri, name, artist, positionInSearch)(dispatch, getState);

        const dispatchArgs = dispatch.mock.calls[0][0];

        const expectedTrack = {
          artist: "Fleetwood mac",
          name: "Go your own way",
          votes: 0,
          uri: "912",
          updatedAt: mockDateNow.toISOString()
        };
        expect(dispatchArgs.payload).toEqual({
          position: 2,
          positionInSearch: 2,
          track: expectedTrack
        });
        expect(dispatchArgs.callAPI("123", 2, expectedTrack)).toEqual(
          addToPlaylistApi("123", 2, expectedTrack)
        );
        expect(dispatchArgs.types).toEqual([
          "ADD_TO_PLAYLIST",
          "ADD_TO_PLAYLIST_SUCCESS",
          "ADD_TO_PLAYLIST_FAILURE"
        ]);
        expect(dispatchArgs.requiresAuth).toEqual(true);
      });
    });
  });

  describe("removeTrack", () => {
    let dispatch, getState;
    beforeEach(() => {
      (dispatch = jest.fn()), (getState = jest.fn(() => initialState));
    });

    it("dispatches delete track actions", () => {
      const uri = "912";
      const position = 3;

      removeTrack(uri, position)(dispatch, getState);

      const dispatchArgs = dispatch.mock.calls[0][0];

      expect(dispatchArgs.payload).toEqual({
        position: 3,
        uri: "912"
      });
      expect(dispatchArgs.callAPI("123", 3)).toEqual(
        removeFromPlaylistApi("123", 3)
      );
      expect(dispatchArgs.types).toEqual([
        "DELETE_TRACK",
        "DELETE_TRACK_SUCCESS",
        "DELETE_TRACK_FAILURE"
      ]);
      expect(dispatchArgs.requiresAuth).toEqual(true);
    });
  });
});

// describe('updateTrackNumOfVotes', () => {
//   const userId = 'a123';
//   const removedPlaylist = [{ uri: '111', votes: 10 }];
//   const lockedTrack = [{ uri: '222', votes: 8 }];
//   const tracks = [
//     { uri: '123', votes: 4, upVoters: { userId: 5 } },
//     // { uri: '456', votes: 3 },
//     { uri: '678', votes: -1 }
//   ];

//   const initialState = {
//     playlist: {
//       tracks,
//       removedPlaylist,
//       lockedTrack
//     },
//     appUser: { userId }
//   };

//   const mockDateNow = new Date('2019');
//   global.Date = jest.fn(() => mockDateNow);

//   let dispatch, getState;
//   beforeEach(() => {
//     (dispatch = jest.fn()), (getState = jest.fn(() => initialState));
//   });

//   // describe('when the new number of votes is greater than max upvotes allowed per user', () => {
//   //   it('dispatches upvote limit exceeded', () => {
//   //     updateTrackNumOfVotes(uri, position, change)(dispatch, getState);

//   //     const dispatchArgs = dispatch.mock.calls[0][0];
//   //   });
//   // });
//   describe('when the number of votes has increased', () => {
//     describe('when the ')
//   })
// });
