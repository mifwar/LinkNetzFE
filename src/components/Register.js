import { useState } from "react";
import Link from "next/link";

import Notification from "./Notification";
import GoogleAuth from "./GoogleAuth";
import Input from "./Input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiLink } from "react-icons/fi";

const Register = (props) => {
  const { setMode } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const forms = [
    { id: "full_name", placeholder: "Full Name", setter: setFullName },
    { id: "email", placeholder: "Email", setter: setEmail },
    { id: "password", placeholder: "Password", setter: setPassword },
  ];

  const handleRegister = async () => {
    event.preventDefault();

    const payload = JSON.stringify({
      fullName: fullName,
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      requestOptions
    );
    const res = await response.json();
    setErrorMessage(res.message);
  };

  return (
    <div className="mx-10 py-8 h-1/2">
      <div className="flex mx-auto justify-center">
        <div className=" rounded-full bg-blue-500 text-5xl text-white p-5 my-3">
          <FiLink />
        </div>
      </div>
      <h1 className="text-2xl text-center my-2 mx-10">
        Get organized with LinkSavvy!
      </h1>
      <h4 className="text-sm text-center my-2">
        Sign up and simplify your bookmark management
      </h4>

      <Notification message={errorMessage} setMessage={setErrorMessage} />

      <form onSubmit={handleRegister} className="rounded-b-xl px-8 pt-6">
        {forms.map((form, i) => {
          const isPassword = form.id === "password";
          return (
            <div className={"mb-4" + isPassword ? "flex flex-row-reverse" : ""}>
              <Input
                key={i}
                id={form.id}
                type={isPassword && !togglePassword ? "password" : "text"}
                placeholder={form.placeholder}
                setter={form.setter}
              />
              {isPassword ? (
                <button
                  className=" bg-transparent h-10 absolute mx-0 px-2"
                  type="button"
                >
                  {togglePassword ? (
                    <AiFillEye
                      className="text-gray-300 top-1 my-1 right-2 text-xl hover:text-gray-400"
                      onClick={() => {
                        setTogglePassword(!togglePassword);
                      }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className="text-gray-300 top-1 my-1 right-2 text-xl hover:text-gray-400"
                      onClick={() => {
                        setTogglePassword(!togglePassword);
                      }}
                    />
                  )}
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })}
        <div className="flex flex-col gap-y-3 my-8">
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign Up
          </button>
          <div>
            <div className="flex justify-center items-center my-4">
              <hr className="border-t border-gray-400 flex-grow" />
              <span className="mx-6 font-bold text-gray-500">OR</span>
              <hr className="border-t border-gray-400 flex-grow" />
            </div>
            <GoogleAuth />
          </div>
        </div>
      </form>

      <div className="flex flex-row gap-2 items-center justify-center my-4">
        <p>Already have an account?</p>
        <Link href="/auth/login">
          <button
            className="underline hover:text-blue-500 cursor-pointer"
            onClick={() => setMode("login")}
          >
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
