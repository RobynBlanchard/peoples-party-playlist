const defaultState = {
  signedIn: false,
  token: '',
  userId: '',
}


const authReducer = ( state = defaultState, action ) => {
  console.log('state', state)
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

export default authReducer;