import React, { useEffect, PropsWithChildren } from "react";
import { useLogin } from "../context/AppProvider";
import {
  useNavigate,
  NavigateFunction,
  Navigate,
  Outlet,
} from "react-router-dom";

const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const token = useLogin()?.token;
  const isLoadingToken = useLogin()?.token;
  const navigate = useNavigate();

  if (!isLoadingToken) {
    // return <Navigate to="/" />;
    console.log("Carregando...");
  } else {
    console.log("Carregou!");
  }

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("user.token");
    const sessionUser = sessionStorage.getItem("user.user");

    if (!sessionToken) {
      console.log("No token!");
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return children;
};

export default AuthenticatedRoute;
