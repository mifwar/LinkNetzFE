import { useContext, useState, useEffect } from "react";
import { TokenContext } from "./_app";
import withAuth from "../utils/utils";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  const { token, name } = useContext(TokenContext);

  return (
    <div className="bg-slate-50">
      {token && (
        <div className="flex flex-col h-screen">
          <Navbar name={name} />
          <Sidebar />
        </div>
      )}
    </div>
  );
  // return <AuthToggle />;
};

export default withAuth(Home);
