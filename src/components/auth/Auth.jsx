import { Navigate } from "react-router-dom";

export const Auth = ({ children }) => {
  const isLoggedIn = false;
  return isLoggedIn ? children : <Navigate to={"/"} replace />;
};
