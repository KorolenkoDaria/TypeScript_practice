import React, { ReactNode } from "react";
import { useAppSelector } from "../hook";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo = "/react_typescript_todo/signin",
}) => {
  const isLogged = useAppSelector((state) => state.auth.isLoggedIn);

  /*   const isRefresh = useSelector(selectisRefreshing);
  const shouldRedirect = !isLogged && !isRefresh; */

  return isLogged ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
