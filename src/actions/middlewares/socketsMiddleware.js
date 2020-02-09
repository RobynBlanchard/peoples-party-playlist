import io from 'socket.io-client';

export const socketMiddleware = ({ dispatch }) => {
  const socket = io('/');

  socket.on('message', action => {
    dispatch(action);
  });

  return next => action => {
    if (action.handler === 'WS') {
      socket.send({ type: action.type, payload: action.payload });
      return;
    }

    return next(action);
  };
};
