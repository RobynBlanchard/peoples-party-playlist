import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { socketMiddleware } from './actions/middlewares/socketsMiddleware';
import { callAPIMiddleware } from './actions/middlewares/callAPIMiddleware';

const configureStore = initialState => {
  const middlewares = [thunk, callAPIMiddleware, socketMiddleware];

  const store = applyMiddleware(...middlewares)(createStore)(
    reducer,
    initialState
  );

  return store;
};

export default configureStore;
