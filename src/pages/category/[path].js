import { useContext } from "react";
import { useRouter } from "next/router";
import { TokenContext } from "../_app";
import withAuth from "../../utils/utils";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Category = () => {
  const { token, name } = useContext(TokenContext);
  const router = useRouter();

  const { pid } = router.query;

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
};

export default withAuth(Category);
