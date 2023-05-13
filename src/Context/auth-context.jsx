import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: null,
  // userId: null,
  // userName: null,
  token: null,
  // login: () => {},
  // logout: () => {}
});
