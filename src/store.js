import thunkMiddleWare from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';
import reducer from './reducers';

const loadState = stateName => {
  try {
    const serializedState = localStorage.getItem(stateName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state, stateName) => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(stateName, serializedState);
    }
  } catch (err) {
    throw new Error("Can't save changes in local storage");
  }
};

const configureStore = initialState => {
  // const persistedState = loadState('playlist');

  // if (initialState && persistedState) {
  //   initialState.playlists.playlist = persistedState.playlist || [];
  // }

  const store = applyMiddleware(thunkMiddleWare)(createStore)(
    reducer,
    initialState
  );

  store.subscribe(
    throttle(() => {
      saveState(
        {
          playlist: store.getState().playlists.playlist
        },
        'playlist'
      );
    }, 1000)
  );

  return store;
};

export default configureStore;
