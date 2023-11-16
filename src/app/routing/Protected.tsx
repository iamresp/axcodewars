import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const Protected = ({ children }: Props) => {
  const cookie = document.cookie;

  const cookieParts = cookie.split(" ");

  const token = cookieParts[1];

  if (!token) {
    return <Navigate to="/auth" />;
  } else {
    return children;
  }
};
