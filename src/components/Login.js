import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Notification from "./Notification";
import GoogleAuth from "./GoogleAuth";
import { TokenContext } from "../pages/_app";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiLink } from "react-icons/fi";

const Login = (props) => {
  const { setMode, icon } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(TokenContext);

  const router = useRouter();

  const eyeStyle =
    "text-gray-300 top-1 my-1 right-2 text-xl hover:text-gray-400";

  const handleLogin = async () => {
    event.preventDefault();

    const payload = JSON.stringify({ email: email, password: password });

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: payload,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      requestOptions
    );
    const res = await response.json();

    if (res.token) {
      setToken(res.token);
      router.push("/");
    } else {
      setErrorMessage(res.message);
    }
  };

  useEffect(() => {
    if (router.pathname === "/auth/wrongMethod")
      setErrorMessage(
        "This email is already registered using email and password. Please sign using your email and password"
      );
  }, []);

  return (
    <div className="mx-10 py-8 h-1/2">
      <Notification message={errorMessage} setMessage={setErrorMessage} />
      <div className="flex mx-auto justify-center">
        <div className=" rounded-full bg-blue-500 text-5xl text-white p-5 my-3">
          <FiLink />
        </div>
      </div>
      <h1 className="text-2xl text-center my-2 mx-20">Welcome to LinkSavvy!</h1>
      <h4 className="text-sm text-center my-2">sign in to continue</h4>

      <div className="w-96 mx-auto">
        <form onSubmit={handleLogin} className="rounded-b-xl px-8 pt-6">
          <div className="mb-4">
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:outline-gray-300"
              id="email"
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            ></input>
          </div>
          <div className="mb-2 flex flex-row-reverse">
            <input
              className="shadow border rounded w-full py-2 pl-3 pr-8 text-gray-700 leading-tight focus:outline-2 focus:outline-gray-300"
              id="password"
              type={togglePassword ? "text" : "password"}
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            ></input>
            <button
              className=" bg-transparent h-10 absolute mx-0 px-2"
              type="button"
              onClick={() => {
                setTogglePassword(!togglePassword);
              }}
            >
              {togglePassword ? (
                <AiFillEye className={eyeStyle} />
              ) : (
                <AiFillEyeInvisible className={eyeStyle} />
              )}
            </button>
          </div>

          <div className="text-right">
            <a className="underline hover:text-blue-500 cursor-pointer">
              Forgot Password?
            </a>
          </div>

          <div className="flex flex-col gap-y-3 my-8">
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
            <div className="flex justify-center items-center my-3">
              <hr className="border-t border-gray-400 flex-grow" />
              <span className="mx-6 font-bold text-gray-500">OR</span>
              <hr className="border-t border-gray-400 flex-grow" />
            </div>

            <GoogleAuth />
          </div>
        </form>
      </div>
      <div className="flex flex-row gap-2 my-4 items-center justify-center">
        <p>Don't have an account?</p>
        <Link href="/auth/register">
          <button
            className="underline hover:text-blue-500 cursor-pointer"
            onClick={() => setMode("register")}
          >
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
