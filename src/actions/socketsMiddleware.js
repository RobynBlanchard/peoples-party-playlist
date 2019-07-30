import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export const createMySocketMiddleware = () => {
  return storeAPI => {
    socket.on('message', action => {
      console.log('socket receives action')

      storeAPI.dispatch(action);
    });

    return next => action => {
      if (action.handler === 'WS') {
        console.log('socket sends action')
        socket.send({ type: action.type, payload: action.payload });
        return;
      }

      return next(action);
    };
  };
};
