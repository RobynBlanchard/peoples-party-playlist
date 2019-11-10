import { addToPlaylist } from './playlist';

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
});
