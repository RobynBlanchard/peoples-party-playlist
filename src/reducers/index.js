import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from './authReducer';

const reducer = combineReducers( {
  auth: authReducer,
} );

export default reducer;