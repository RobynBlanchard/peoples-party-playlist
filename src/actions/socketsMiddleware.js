import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export const createMySocketMiddleware = () => {
  return storeAPI => {
      // let socket = createMyWebsocket(url);

      socket.on("message", (message) => {
        console.log('1')
          storeAPI.dispatch({
              type : "SOCKET_MESSAGE_RECEIVED",
              payload : message
          });
      });

      return next => action => {
          if(action.type == "SEND_WEBSOCKET_MESSAGE") {
        console.log('2')

              socket.send(action.payload);
              return;
          }

          return next(action);
      }
  }
}