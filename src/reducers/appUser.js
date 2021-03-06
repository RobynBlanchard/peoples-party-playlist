const defaultState = {
  userId: ''
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'ASSIGN_APP_USER':
      return {
        ...state,
        userId: action.payload
      };
    default:
      return state;
  }
};

export default user;
