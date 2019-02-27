const initialState = {
  authenticationRequired: false
};

export function root(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticationRequired: true
      };
    case "SET_AUTH_DATA":
      return {
        ...state,
        // authData: action.payload,
        ownUsername: action.payload && action.payload.username
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}
