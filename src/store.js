import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { socketMiddleware } from './actions/socketsMiddleware';
import { callAPIMiddleware } from './actions/callAPIMiddleware';

const configureStore = initialState => {
  const middlewares = [thunk, socketMiddleware, callAPIMiddleware];

  const store = applyMiddleware(...middlewares)(createStore)(
    reducer,
    initialState
  );

  return store;
};

export default configureStore;
