// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { socketMiddleware } from './socketsMiddleware';
// import { callAPIMiddleware } from './callAPIMiddleware';
// import { addToPlaylist } from './playlist';

// const middlewares = [thunk, callAPIMiddleware, socketMiddleware];
// const mockStore = configureStore(middlewares);

// describe('addToPlaylist', () => {
//   describe('when the track is already on the playlist', () => {
//     const tracks = [{ uri: '123' }];
//     const initialState = { playlist: { tracks } };
//     const store = mockStore(initialState);

//     it('dispatches add to playist disallowed', () => {
//       const uri = '123';
//       const name = 'Do I wanna know?';
//       const artist = 'Arctic Monkeys';
//       const positionInSearch = 2;

//       store.dispatch(addToPlaylist(uri, name, artist, positionInSearch));

//       const actions = store.getActions();
//       const expectedAction = {
//         type: 'ADD_TO_PLAYLIST_DISALLOWED',
//         payload: 2
//       };
//       expect(actions).toEqual([expectedAction]);
//     });
//   });

  // unit test
  // describe('when the track is not already on the playlist', () => {
  //   it('dispatches add to playlist', () => {
  //     const DATE_TO_USE = new Date('2019');
  //     const _Date = Date;
  //     global.Date = jest.fn(() => DATE_TO_USE);
  //     global.Date.now = _Date.now;

  //     const removedPlaylist = [{ uri: '111', votes: 10 }];
  //     const lockedTrack = [{ uri: '222', votes: 8 }];
  //     const tracks = [
  //       { uri: '123', votes: 4 },
  //       { uri: '456', votes: 3 },
  //       { uri: '678', votes: -1 }
  //     ];

  //     const initialState = {
  //       playlist: { tracks, removedPlaylist, lockedTrack },
  //       auth: { token: 'abc123' }
  //     };
  //     const store = mockStore(initialState);

  //     // new track - make object?
  //     const uri = '333';
  //     const name = 'Hey jude';
  //     const artist = 'The Beatles';
  //     const positionInSearch = 1;

  //     store.dispatch(addToPlaylist(uri, name, artist, positionInSearch));

  //     expect(dispatch).toHaveBeenCalledWith({ a: 1 });
  //   });
  // });

  // integration test
  // describe('when the track is not already on the playlist', () => {
  //   it('dispatches add to playlist', () => {
  //     // jest.spyOn(Date, 'now').mockImplementation(() => now);
  //     const DATE_TO_USE = new Date('2019');
  //     const _Date = Date;
  //     global.Date = jest.fn(() => DATE_TO_USE);
  //     // global.Date.UTC = _Date.UTC;
  //     // global.Date.parse = _Date.parse;
  //     global.Date.now = _Date.now;

  //     const removedPlaylist = [{ uri: '111', votes: 10 }];
  //     const lockedTrack = [{ uri: '222', votes: 8 }];
  //     const tracks = [
  //       { uri: '123', votes: 4 },
  //       { uri: '456', votes: 3 },
  //       { uri: '678', votes: -1 }
  //     ];

  //     const initialState = {
  //       playlist: { tracks, removedPlaylist, lockedTrack },
  //       auth: { token: 'abc123' }
  //     };
  //     const store = mockStore(initialState);

  //     // new track - make object?
  //     const uri = '333';
  //     const name = 'Hey jude';
  //     const artist = 'The Beatles';
  //     const positionInSearch = 1;

  //     store.dispatch(addToPlaylist(uri, name, artist, positionInSearch));
  //     const actions = store.getActions();

  //     const expectedAction = [
  //       {
  //         type: 'ADD_TO_PLAYLIST',
  //         payload: {
  //           position: 2,
  //           positionInSearch: 1,
  //           track: {
  //             artist: 'The Beatles',
  //             name: 'Hey jude',
  //             votes: 0,
  //             uri: '333',
  //             updatedAt: DATE_TO_USE.toISOString()
  //           },
  //           response: {
  //             loading: true
  //           }
  //         }
  //       }
  //     ];
  //     expect(actions).toEqual(expectedAction);
  //   });
  // });
// });

// non intengration - - mock spotify offfset and track new positon, expect dispatch to be called with
