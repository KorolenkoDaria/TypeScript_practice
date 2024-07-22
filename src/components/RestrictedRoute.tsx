// components/RestrictedRoute.tsx
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../hook";
import { Navigate } from "react-router-dom";

interface RestrictedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  children,
  redirectTo = "/react_typescript_todo/todos",
}) => {
  const isLogged = useAppSelector((state) => state.auth.isLoggedIn);
  return isLogged ? <Navigate to={redirectTo} replace /> : <>{children}</>;
};

export default RestrictedRoute;
