import { useEffect, useState, useRef } from "react";
import { IoBookmarksOutline } from "react-icons/io5";
import { TbMist, TbHash } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { FiCheck, FiX } from "react-icons/fi";
import { FaCaretRight } from "react-icons/fa";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import SidebarDropdownMenuItem from "./SidebarDropdownMenuItem";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar = () => {
  const handleNewCategory = () => {
    console.log("add new category");
  };
  const handleNewTag = () => {
    console.log("add new tags");
  };

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

  const dropdownMenuItems = [
    {
      label: "Categories",
      icon: <BiCategory />,
      handler: handleNewCategory,
      placeholder: "Category Name",
      ref: useRef(null),
      contents: [
        {
          label: "knowledge",
          emoji: "🧠",
        },
        {
          label: "funny",
          emoji: "🤣",
        },
        {
          label: "othersothersothersothersothersothersothers",
          emoji: "📁",
        },
      ],
    },
    {
      label: "Tags",
      icon: <TbHash />,
      handler: handleNewTag,
      placeholder: "Tag Name",
      ref: useRef(null),
      contents: [
        {
          label: "music",
          emoji: "🎵",
        },
        {
          label: "movie",
          emoji: "🍿",
        },
        {
          label: "tech",
          emoji: "🧑‍💻",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full w-80 font-Lato overflow-y-auto border-r">
      <div>
        {menuItems.map((menuItem, i) => (
          <SidebarMenuItem {...menuItem} key={i} />
        ))}
      </div>
      <hr className="border-t border-gray-400 my-3" />
      {dropdownMenuItems.map((menu, i) => {
        return <SidebarDropdownMenuItem {...menu} key={i} />;
      })}
    </div>
  );
};

export default Sidebar;
