import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { TokenContext } from "../pages/_app";
import Router from "next/router";

const withAuth = (WrappedComponent) => {
  const Component = (props) => {
    const { token, isTokenLoading } = useContext(TokenContext);
    const router = useRouter();

    useEffect(() => {
      const isOnAuth = router.pathname.startsWith("/auth");
      const isRegister = router.pathname === "/auth/register";

      if (!token && !isTokenLoading) {
        if (!isRegister) router.push("/auth/login");
      } else if (isOnAuth) router.push("/");
    }, [token, isTokenLoading]);

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuth;
