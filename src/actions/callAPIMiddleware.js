const socketTypes = [
  'RESUME_PLAYBACK_SUCCESS',
  'PAUSE_PLAYBACK_SUCCESS'
]

export const callAPIMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    // if (typeof action === 'function') {
    //   return action(dispatch, getState);
    // }

    const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action;
    // debugger;
    // if (action && action.handler === 'WS') {
    //   console.log('socket sends action', action)
    //   // socket.send(action);
    //   socket.send({ type: action.type, payload: action.payload });
    //   return;
    // }

    if (!types) {
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }
    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    // TODO: CHANGE - MAKE NOT JUST FOR SPOTIFY CALLS
    const token = getState().auth.token;
    if (!token) {
      return;
    }

    dispatch({
      type: requestType,
      payload: { ...payload, response: { loading: true } }
    });

    return callAPI(token)
      .then(response => {
        return dispatch({
          payload: { ...payload, response },
          type: successType
        });
      })
      .catch(error => {
        return dispatch({
          payload: { ...payload, error },
          type: failureType
        });
      });
  };
}
