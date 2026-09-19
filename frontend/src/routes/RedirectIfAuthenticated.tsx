import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

interface RedirectIfAuthenticatedProps {
  children: ReactElement;
}

export default function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/map" replace />;
  }

  return children;
}
