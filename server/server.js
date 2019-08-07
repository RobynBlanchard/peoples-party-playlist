import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';

import createStore from '../src/store';
import router from './router';
const http = require('http')
const socketIO = require('socket.io')

const app = express();

const server = http.createServer(app)

app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ type: '*/*' }))
// app.use(bodyParser.json());
app.use(boolParser());
app.use(cookieParser());
app.use(express.static('public'));

const store = createStore();

router(app, store);


// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
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

const port = process.env.PORT || 5000;

// app.listen(port);
server.listen(port)
console.log(`Server listening at port ${port}`);
