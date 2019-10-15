import {
  logIn,
  logOut,
  logInCallback,
  logInFailure
} from './controllers/authentication';
import { invite } from './controllers/user';
import {
  addTrack,
  patchTrack,
  getTracks,
  removeTrack
} from './controllers/playlist';

export default (app, store) => {
  app.get('/login', logIn);
  app.get('/log-out', logOut(store));
  app.get('/change-user', logIn);
  app.get('/LogInFailure', logInFailure(store));
  app.get('/callback', logInCallback);
  app.get('/invite', invite);
  app.get('/api/v1/playlist/tracks', getTracks);
  app.delete('/api/v1/playlist/tracks/:id', removeTrack);
  app.post('/api/v1/playlist/tracks', addTrack);
  app.patch('/api/v1/playlist/tracks/:id', patchTrack);
};
