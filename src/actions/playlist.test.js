import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { socketMiddleware } from './socketsMiddleware';
import { callAPIMiddleware } from './callAPIMiddleware';
import { addToPlaylist } from './playlist';

const middlewares = [thunk, callAPIMiddleware, socketMiddleware];
const mockStore = configureStore(middlewares);

describe('addToPlaylist', () => {
  describe('when the track is already on the playlist', () => {
    const tracks = [{ uri: '123' }];
    const initialState = { playlist: { tracks } };
    const store = mockStore(initialState);
  
    it('dispatches add to playist disallowed', () => {
      const uri = '123';
      const name = 'Do I wanna know?';
      const artist = 'Arctic Monkeys';
      const positionInSearch = 2;

      store.dispatch(addToPlaylist(uri, name, artist, positionInSearch));

      const actions = store.getActions();
      const expectedAction = {
        type: 'ADD_TO_PLAYLIST_DISALLOWED',
        payload: 2
      };
      expect(actions).toEqual([expectedAction]);
    });
  });
});
