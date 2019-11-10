import { addToPlaylist } from './playlist';
import { addToPlaylistApi } from './playlistUtils';

describe('addToPlaylist', () => {
  const removedPlaylist = [{ uri: '111', votes: 10 }];
  const lockedTrack = [{ uri: '222', votes: 8 }];
  const tracks = [
    { uri: '123', votes: 4 },
    { uri: '456', votes: 3 },
    { uri: '678', votes: -1 }
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
  });

  describe('when the track is already on the playlist', () => {
    it('dispatches add to playlist disallowed', () => {
      const uri = '123';
      const name = 'Do I wanna know?';
      const artist = 'arctic monkeys';
      const positionInSearch = 2;

      addToPlaylist(uri, name, artist, positionInSearch)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'ADD_TO_PLAYLIST_DISALLOWED',
        payload: 2
      });
    });
  });

  describe('when the track is not already on the playlist', () => {
    const uri = '912';
    const name = 'Go your own way';
    const artist = 'Fleetwood mac';
    const positionInSearch = 2;

    const mockDateNow = new Date('2019');
    global.Date = jest.fn(() => mockDateNow);

    it('dispatches add to playlist actions for call api middleware', () => {
      addToPlaylist(uri, name, artist, positionInSearch)(dispatch, getState);

      const dispatchArgs = dispatch.mock.calls[0][0];

      const expectedTrack = {
        artist: 'Fleetwood mac',
        name: 'Go your own way',
        votes: 0,
        uri: '912',
        updatedAt: mockDateNow.toISOString()
      };
      expect(dispatchArgs.payload).toEqual({
        position: 2,
        positionInSearch: 2,
        track: expectedTrack
      });
      expect(dispatchArgs.callAPI('123', 2, expectedTrack)).toEqual(
        addToPlaylistApi('123', 2, expectedTrack)
      );
      expect(dispatchArgs.types).toEqual([
        'ADD_TO_PLAYLIST',
        'ADD_TO_PLAYLIST_SUCCESS',
        'ADD_TO_PLAYLIST_FAILURE'
      ]);
      expect(dispatchArgs.requiresAuth).toEqual(true);
    });
  });
});
