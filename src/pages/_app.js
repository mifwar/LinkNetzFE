import "@/styles/globals.css";

import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState("");

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
        }
      } catch {
        console.log("unable to contact the server");
      }
    };

    fetchToken();
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Component {...pageProps} />
    </TokenContext.Provider>
  );
}
