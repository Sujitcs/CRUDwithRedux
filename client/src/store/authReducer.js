const initialState = {
  token: null,
  isAuth: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'signin':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuth: true,
      };
    case 'logout':
      return {
        ...state,
        token: null,
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
