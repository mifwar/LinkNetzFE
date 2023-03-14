import { useState } from "react";
import Search from "../Search";

import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";

const Navbar = (props) => {
  const { name } = props;

  const [toggleProfile, setToggleProfile] = useState(false);

  return (
    <nav className="w-full h-14">
      <div className="flex items-center justify-center h-full bg-slate-50 border">
        <Link className="mx-3" href="/">
          <Image
            src="/resources/blackLogo.svg"
            width={175}
            height={20}
            alt="LinkSavvy logo"
          />
        </Link>

        <Search />
        <button
          className="flex gap-2 hover:bg-slate-200 p-4"
          onClick={() => {
            setToggleProfile(!toggleProfile);
          }}
        >
          <Image
            src="http://127.0.0.1:8080/uploads/man.png"
            width={25}
            height={25}
            alt="profile picture"
          />
          <p className="overflow-hidden">{name}</p>
        </button>
      </div>
      {toggleProfile && <UserMenu />}
    </nav>
  );
};

export default Navbar;
