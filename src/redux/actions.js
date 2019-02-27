export const login = () => ({
  type: "LOGIN"
});
export const logout = () => ({
  type: "LOGOUT"
});
export const setAuthData = payload => ({
  type: "SET_AUTH_DATA",
  payload
});
