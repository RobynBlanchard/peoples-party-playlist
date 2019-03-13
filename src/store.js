import thunkMiddleWare from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from "redux";

export const signIn = ( accesToken ) => ( {
    type: "SIGN_IN",
    payload: accesToken,
} );

export const signOut = ( ) => ( {
    type: "SIGN_OUT",
} );

const defaultState = {
    signedIn: false,
    token: '',
    userId: '',
}

const sessionReducer = ( state = defaultState, action ) => {
    console.log('action payloadddd:', action.payload)
    switch ( action.type ) {
        case "SIGN_IN":
            return {
                ...state,
                signedIn: true,
                token: action.payload.token,
            };
        case "SIGN_OUT":
            return {
                signedIn: false,
                token: '',
                user: '',
            };
        case 'FETCH_USER':
            return {
                ...state,
                userId: action.payload,
            };
        default:
            return state;
    }
};

const reducer = combineReducers( {
    loggedIn: sessionReducer,
} );

export default ( initialState ) => applyMiddleware(thunkMiddleWare)(createStore)( reducer, initialState );
