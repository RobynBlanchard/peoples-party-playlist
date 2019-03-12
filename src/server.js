import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { Provider } from 'react-redux';

import createStore, { initializeSession } from './store';
import App from './components/App';
import { logIn, loginCallback } from './LogIn';
import routes from './routes';

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(cookieParser());

app.get('/*', (req, res) => {
  // let preLoadedState = { loggedIn: false, spotifyAccessToken: null }
  // if (req.url === '/login') {
  //   logIn(req, res);
  // } else if (req.url.split('?')[0] === '/callback') {
  //   return loginCallback(req, res);
  // } else if (req.url.split('?')[0] === '/LogInSuccess') {
  //   const token = req.cookies.spotifyAccessToken;
  //   // preLoadedState = { loggedIn: true,  spotifyAccessToken: token }
  // }

  const sheet = new ServerStyleSheet();

  const context = {};
  const store = createStore();
  // const store = createStore(preLoadedState);

  store.dispatch(initializeSession());

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

app.listen(3000);

console.log(`Server listening at port 3000`);

function htmlTemplate(reactDom, styles, reduxState) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>People's Party Playlist</title>
            ${styles}
        </head>

        <body>
            <div id="app">${reactDom}</div>
            <script>
              window.REDUX_DATA = ${JSON.stringify(reduxState)}
            </script>
            <script type="text/jsx" src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
