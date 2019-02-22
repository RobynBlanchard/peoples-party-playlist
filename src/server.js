import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import App from './components/App';
import { logIn, loginCallback } from './LogIn';

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(cookieParser());

app.get('/*', (req, res) => {
  if (req.url === '/login') {
    logIn(req, res);
  } else if (req.url.split('?')[0] === '/callback') {
    return loginCallback(req, res);
  }

  const sheet = new ServerStyleSheet();
  const context = {};
  const jsx = (
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );
  const reactDom = renderToString(sheet.collectStyles(jsx));
  const styles = sheet.getStyleTags();
  res.end(htmlTemplate(reactDom, styles));
});

app.listen(3000);

console.log(`Server listening at port 3000`);

function htmlTemplate(reactDom, styles) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>People's Party Playlist</title>
            ${styles}
        </head>

        <body style="margin:0">
            <div id="app">${reactDom}</div>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
