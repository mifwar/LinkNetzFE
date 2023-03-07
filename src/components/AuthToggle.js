import { useState } from "react";
import { useRouter } from "next/router";
import Login from "./Login";
import Register from "./Register";
import { FiLink } from "react-icons/fi";

const AuthToggle = () => {
  const router = useRouter();
  const isRegister = router.pathname === "/auth/register";

  const [mode, setMode] = useState("login");

  return (
    <div className="flex justify-center h-screen min-w-full">
      <div className="my-auto ">
        {isRegister ? (
          <Register setMode={setMode} icon={FiLink} />
        ) : (
          <Login setMode={setMode} icon={FiLink} />
        )}
      </div>
    </div>
  );
};

export default AuthToggle;
