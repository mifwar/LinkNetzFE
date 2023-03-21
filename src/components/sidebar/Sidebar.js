import { useState, useEffect, useContext } from "react";
import { IoBookmarksOutline } from "react-icons/io5";
import { TbMist, TbHash } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";

import SidebarDropdownMenuItem from "./SidebarDropdownMenuItem";
import SidebarMenuItem from "./SidebarMenuItem";
import { TokenContext } from "../../pages/_app";

const Sidebar = () => {
  const { token } = useContext(TokenContext);

  const menuItems = [
    {
      label: "All Bookmarks",
      icon: <IoBookmarksOutline />,
      amount: 10,
    },
    {
      label: "Uncategorized",
      icon: <TbMist />,
      amount: 20,
    },
  ];

  const [categoryContents, setCategoryContents] = useState([]);
  const [tagContents, setTagContents] = useState([]);

  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const dropdownMenuItems = [
    {
      title: "Categories",
      label: "Category",
      icon: <BiCategory />,
      contents: categoryContents,
      onSubmitDone: () => fetchData("categories", setCategoryContents),
    },
    {
      title: "Tags",
      label: "Tag",
      icon: <TbHash />,
      contents: tagContents,
      onSubmitDone: () => fetchData("tags", setTagContents),
    },
  ];

  const fetchData = async (endpoint, setState) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`,
      requestOptions
    );

    const data = await response.json();

    if (data) setState(data);
  };

  useEffect(() => {
    fetchData("categories", setCategoryContents);
    fetchData("tags", setTagContents);
  }, []);

  return (
    <div className="flex flex-col h-full w-80 font-Lato overflow-y-auto border-r">
      {menuItems.map((menuItem, i) => (
        <SidebarMenuItem {...menuItem} key={i} />
      ))}

      <hr className="border-t border-gray-400 my-3" />

      {dropdownMenuItems.map((menu, i) => {
        return <SidebarDropdownMenuItem {...menu} key={i} />;
      })}
    </div>
  );
};

export default Sidebar;
