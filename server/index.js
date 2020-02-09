import express from 'express';
import http from 'http';
// import openBrowser from 'react-dev-utils/openBrowser';

import createStore from '../src/store';
import setUpDevServer from './setupDevServer';
import setUpMiddlewares from './middlewares';
import renderReact from './renderReact';
import setUpApi from './setUpApi';

const app = express();
const server = http.createServer(app);
const store = createStore();


if (process.env.NODE_ENV !== 'production') {
  setUpDevServer(app);
}

setUpMiddlewares(app, server);
setUpApi(app, store);

renderReact(app, store);

const PORT = process.env.PORT || 5000;
// const HOST = 'localhost';
server.listen(PORT, err => {
  if (!err) {
    const url = `http://:${PORT}`;
    console.log(`Server listening at: ${url}`);

    // openBrowser(url);
  } else {
    console.error(err);
  }
});
