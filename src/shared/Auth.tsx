import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { ReactNode } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";

function Auth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const userData = useAppSelector((state) => state.userReducer.user);
  useCheckAuth();
  if (!userData?.email) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  } else {
    return <div>{children}</div>;
  }
}

export default Auth;
