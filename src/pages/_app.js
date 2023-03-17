import "@/styles/globals.css";

import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_AUTH_KEY,
            },
          }
        );
        const json = await response.json();

        if (json.token) {
          setToken(json.token);
        } else {
          setIsTokenLoading(false);
        }
      } catch {
        console.log("unable to contact the server");
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const json = await response.json();

        console.log("json user: ", json);

        if (json.name) {
          setName(json.name);
          setIsTokenLoading(false);
        } else {
          setToken("");
        }
      } catch {
        console.log("unable to contact the server");
      }
    };

    if (token) fetchUser();
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken, isTokenLoading, name }}>
      <Component {...pageProps} />
    </TokenContext.Provider>
  );
}
