import { socketTypes } from './types';

export const callAPIMiddleware = ({ dispatch, getState }) => {
  return next => action => {

    const { types, callAPI, shouldCallAPI = () => true, payload = {}, requiresAuth = false } = action;

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

    let token;
    if (requiresAuth) {
      token = getState().auth.token;
    }
console.log('1')
    dispatch({
      type: requestType,
      payload: { ...payload, response: { loading: true } }
    });

    console.log('2')

    return callAPI(token)
      .then(response => {
        console.log('3')

        if (socketTypes.includes(successType)) {
          console.log('4')

          return dispatch({
            payload: { ...payload, response },
            type: successType,
            handler: 'WS'
          });
        }
        console.log('5')

        return dispatch({
          payload: { ...payload, response },
          type: successType
        });
      })
      .catch(error => {
        console.log('6')

        return dispatch({
          payload: { ...payload, error },
          type: failureType
        });
      });
  };
}
