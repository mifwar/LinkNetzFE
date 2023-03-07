import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { TokenContext } from "../pages/_app";
import Router from "next/router";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { token } = useContext(TokenContext);
    const router = useRouter();

    useEffect(() => {
      const isOnAuth = router.pathname.startsWith("/auth");
      const isRegister = router.pathname === "/auth/register";
      if (!token) {
        if (!isRegister) router.push("/auth/login");
      } else if (isOnAuth) router.push("/");
    }, [token]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
