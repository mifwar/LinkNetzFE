import { useContext } from "react";
import { TokenContext } from "../../pages/_app";

import Link from "next/link";

import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

const UserMenu = () => {
  const { setToken } = useContext(TokenContext);

  const handleLogOut = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      { credentials: "include" }
    );

    const result = await response.json();

    if (result) setToken("");
  };

  const handleSettings = async () => {
    console.log("settings clicked");
  };

  const UserMenus = [
    {
      label: "Account Settings",
      icon: <IoSettingsOutline />,
      callback: handleSettings,
      endpoint: "/#",
    },
    {
      label: "Log Out",
      icon: <BiLogOut />,
      callback: handleLogOut,
      endpoint: "/#",
    },
  ];

  return (
    <div className="flex">
      <div className="flex flex-col mx-auto h-full mr-2 shadow">
        {UserMenus.map((menu) => {
          return (
            <button onClick={menu.callback}>
              <Link
                className="flex flex-row items-center gap-2 py-2 px-4 hover:bg-slate-200 w-full"
                href={menu.endpoint}
              >
                <div className="text-lg">{menu.icon}</div>
                {menu.label}
              </Link>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UserMenu;
