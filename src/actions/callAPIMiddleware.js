export function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action;

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

    dispatch(
      Object.assign({}, payload, {
        type: requestType,
        response: { loading: true }
      })
    );

    return callAPI(token)
      .then(response => {
        // console.log(response)
        // console.log(Object.assign({}, payload, {
        //   response: response.data,
        //   type: successType,
        //   handler: 'WS',
        // }))

        // return dispatch(
        //   Object.assign({}, payload, {
        //     response: response.data,
        //     type: successType,
        //     // handler: 'WS',
        //   })s
        // );
        // if (successType !== 'GET_CURRENTLY_PLAYING_SUCCESS') {
          return dispatch({
            payload: { ...payload, response },
            type: successType,
            handler: 'WS'
          });
        // } else {
        //   return dispatch({
        //     payload: { ...payload, response },
        //     type: successType
        //   });
        // }
      })
      .catch(error => {
        console.log('error!')

        // return dispatch({
        //   payload: { ...payload, error },
        //   type: failureType,
        //   handler: 'WS'
        // });

        dispatch(
          Object.assign({}, payload, {
            error,
            type: failureType
          })
        );
      });
  };
}
