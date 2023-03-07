import { useContext, useState, useEffect } from "react";
import { TokenContext } from "./_app";
import withAuth from "../utils/utils";

import Link from "next/link";

const Home = () => {
  const { token, setToken } = useContext(TokenContext);
  // const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");

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
      // setUserEmail(json.email);
      json.name ? setName(json.name) : setToken("");
    } catch {
      console.log("unable to contact the server");
    }
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  return (
    <>
      {token ? (
        <div>
          <p>access granted</p>
          <p>welcome {name}</p>
          <button
            onClick={async () => {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
                {
                  credentials: "include",
                }
              );

              const result = await response.json();

              if (result) setToken("");
            }}
          >
            <Link href="/auth/login">Logout</Link>
          </button>
        </div>
      ) : (
        <div>
          <button>
            <p>access denied</p>
            <Link href="/auth/login">Login</Link>
          </button>
        </div>
      )}
    </>
  );
  // return <AuthToggle />;
};

export default withAuth(Home);
