import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import routes from '../src/routes';
import App from '../src/components/App';
import {
  logIn,
  logOut,
  logInCallback,
  logInFailure,
} from './controllers/authentication';
import {
  invite
} from './controllers/user';
import { addTrack, addVote, decreaseVote, fetchPlaylist } from './controllers/playlist';
import htmlTemplate from './htmlTemplate';
import { logInSucess } from '../src/actions';

export default (app, store) => {
  app.get('/login', logIn);
  app.get('/log-out', logOut(store));
  app.get('/change-user', logIn);
  app.get('/LogInFailure', logInFailure(store));
  app.get('/callback', logInCallback);
  app.get('/playlist-fetch', fetchPlaylist);
  app.get('/invite', invite);


  app.get('/*', (req, res) => {
    const context = {};

    const token = req.cookies.spotifyAccessToken;
    if (token) {
      store.dispatch(logInSucess(token));
    }

    const sheet = new ServerStyleSheet();

    const dataRequirements = routes
      .filter(route => matchPath(req.path, route))
      .map(route => route.component)
      .filter(comp => comp.serverFetch)
      .map(comp => store.dispatch(comp.serverFetch()));

    Promise.all(dataRequirements).then(() => {
      const jsx = (
        <Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );
      const reactDom = renderToString(sheet.collectStyles(jsx));
      const reduxState = store.getState();
      const styles = sheet.getStyleTags();

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlTemplate(reactDom, styles, reduxState));
    });
  });

  app.post('/add-to-playlist', addTrack);
  app.post('/add-vote', addVote);
  app.post('/decrement-vote', decreaseVote);

};