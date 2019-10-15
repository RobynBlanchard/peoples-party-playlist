import express from 'express';
import http from 'http';
import openBrowser from 'react-dev-utils/openBrowser';

import createStore from '../src/store';
import setUpDevServer from './setupDevServer';
import setUpMiddlewares from './middlewares';
import renderReact from './renderReact';
import setUpApi from './setUpApi';

const app = express();
const server = http.createServer(app);
const store = createStore();

setUpMiddlewares(app, server);

if (process.env.NODE_ENV !== 'production') {
  setUpDevServer(app);
}

setUpApi(app, store);

renderReact(app, store);

const PORT = 8080;
const HOST = 'localhost';
server.listen(PORT, HOST, err => {
  if (!err) {
    const url = `http://${HOST}:${PORT}`;
    console.log(`Server listening at: ${url}`);

    // openBrowser(url);
  } else {
    console.error(err);
  }
});
