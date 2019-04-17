import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { Provider } from 'react-redux';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(require('../webpack.config'));



import createStore from './store';
import { signIn, signOut } from './actions';
import { logIn, loginCallback, logOut } from './Auth';
import App from './components/App';
import routes from './routes';

const app = express();

// if in dev:
// app.use(middleware(compiler, {
//   // webpack-dev-middleware options
//   writeToDisk: true,
// }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/*', (req, res) => {
  const context = {};
  const store = createStore();

  if (req.url === '/login') {
    return logIn(req, res);
  } else if (req.url.split('?')[0] === '/callback') {
    return loginCallback(req, res);
  } else if (req.url === '/log-out') {
    store.dispatch(signOut());
    return logOut(req, res);
  } else if (req.url === '/change-user') {
    return logIn(req, res);
  }

  const token = req.cookies.spotifyAccessToken;
  if (token) {
    store.dispatch(signIn({ token: token }));
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
            <link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
            <link rel="shortcut icon" href="http://localhost:3000/images/favicon.ico">
        </head>

        <body style="margin:0;">
            <div id="app">${reactDom}</div>
            <script>
              window.REDUX_DATA = ${JSON.stringify(reduxState)}
            </script>
            <script type="text/javascript" src="/main.bundle.js"></script>


        </body>
        </html>
    `;
}
