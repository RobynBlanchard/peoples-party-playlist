import io from 'socket.io-client';

export const socketMiddleware = ({ dispatch }) => {
  const socket = io('http://localhost:5000');

  socket.on('message', action => {
    // console.log('socket receives action', action);
    dispatch(action);
  });

  return next => action => {
    if (action.handler === 'WS') {
      // console.log('socket sends action', action);
      socket.send({ type: action.type, payload: action.payload });
      return;
    }

    return next(action);
  };
};
