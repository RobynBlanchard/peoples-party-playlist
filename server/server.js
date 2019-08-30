import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';

import createStore from '../src/store';
import router from './router';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app)

app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ type: '*/*' }))
app.use(boolParser());
app.use(cookieParser());
app.use(express.static('public'));

const store = createStore();

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

const port = process.env.PORT || 5000;

server.listen(port)
console.log(`Server listening at port ${port}`);
