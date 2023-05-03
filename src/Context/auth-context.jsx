import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: null,
  userId: null,
  token: null,
  // login: () => {},
  // logout: () => {}
});
