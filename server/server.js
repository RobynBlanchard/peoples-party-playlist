import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';
import cors from 'cors';
import http from 'http';
import socketIO from 'socket.io';
import openBrowser from "react-dev-utils/openBrowser";

import createStore from '../src/store';
import router from './router';

const app = express();
const server = http.createServer(app)

app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ type: '*/*' }))
app.use(boolParser());
app.use(cookieParser());
app.use(express.static('public'));

const store = createStore();

const devServer = () => {
  const webpack = require("webpack");
  const webpackConfig = require("../webpack.config");
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    quiet: true,
    noInfo: true,
    stats: "errors-only",
    logLevel: "silent",
    serverSideRender: true
  });

  const hotMiddleware = webpackHotMiddleware(compiler, {
    stats: "errors-only",
    logLevel: "silent",
    log: false,
    quiet: true,
    noInfo: true
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);
};

devServer();

router(app, store);


const io = socketIO(server)

io.on('connection', socket => {
  console.log('User connected')

  socket.on('message', (message) => {
    console.log('Server received message: ', message)
    io.sockets.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

const PORT = 8080;
const HOST = 'localhost'
// server.listen(port, () => {

// })
server.listen(PORT, HOST, err => {
  if (!err) {
    const url = `http://${HOST}:${PORT}`;
    openBrowser(url);
  } else {
    console.error(err);
  }
});
// console.log(`Server listening at port ${PORT}`);
// server.listen(8080)


// TODO: reducer hot module