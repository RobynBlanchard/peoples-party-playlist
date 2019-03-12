import { createStore, combineReducers } from "redux";

export const initializeSession = ( ) => ( {
    type: "INITIALIZE_SESSION",
} );

const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALIZE_SESSION":
            return true;
        default: return state;
    }
};

const reducer = combineReducers( {
    loggedIn: sessionReducer,
} );

export default ( initialState ) => createStore( reducer, initialState );

// import { createStore, combineReducers } from "redux";
// import React from 'react';

// // export const initializeSession = ( ) => ( {
// //     type: "INITIALIZE_SESSION",
// // } );

// // const sessionReducer = ( state = false, action ) => {
// //     switch ( action.type ) {
// //         case "INITIALIZE_SESSION":
// //             return true;
// //         default: return state;
// //     }
// // };

// // const reducer = combineReducers( {
// //     loggedIn: sessionReducer,
// // } );


// const initialState = {
//     loggedIn: false,
//     spotifyAccessToken: ''
// };
// export const reducer = (state = initialState, action) => {
//     // switch(action.type) {
//     //     case 'SET_MESSAGE':
//     //     return {
//     //         ...state,
//     //         message: action.message,
//     //     };
//     //     default:
//     //     return state;
//     // }
//     return state
// };
// export default ( initialState ) => createStore( reducer, initialState );

