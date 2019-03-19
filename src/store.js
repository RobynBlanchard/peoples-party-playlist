import thunkMiddleWare from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from './reducers';


export default ( initialState ) => applyMiddleware(thunkMiddleWare)(createStore)( reducer, initialState );
