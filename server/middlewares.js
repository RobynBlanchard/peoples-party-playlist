import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';
import cors from 'cors';
import socketIO from 'socket.io';

export default (app, server) => {
  app.use(cors());
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json({ type: '*/*' }));
  app.use(boolParser());
  app.use(cookieParser());
  app.use(express.static('dist'));

  const io = socketIO(server);

  io.on('connection', socket => {
    console.log('User connected');

    socket.on('message', message => {
      console.log('Server received message: ', message);
      io.sockets.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
