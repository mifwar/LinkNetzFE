import { useEffect, useState } from "react";
import { IoBookmarksOutline, IoHelpOutline } from "react-icons/io5";
import { TbMist, TbHash } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import {
  AiOutlinePlus,
  AiOutlinePlusSquare,
  AiOutlineUp,
  AiOutlineDown,
  AiOutlineRight,
} from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";

const Sidebar = () => {
  const buttons = [
    {
      label: "All Bookmarks (5)",
      icon: <IoBookmarksOutline />,
    },
    {
      label: "Uncategorized",
      icon: <TbMist />,
    },
  ];

  const menus = [
    {
      label: "Categories",
      icon: <BiCategory />,
    },
    {
      label: "Tags",
      icon: <TbHash />,
    },
  ];

  const categories = [
    {
      label: "animal",
      emoji: "🐲",
    },
    {
      label: "funny",
      emoji: "🤣",
    },
    {
      label: "others",
      emoji: "📁",
    },
  ];

  const tags = [
    {
      label: "chocolate",
      emoji: "🍫",
    },
    {
      label: "movie",
      emoji: "🍿",
    },
    {
      label: "tech",
      emoji: "🧑‍💻",
    },
  ];
  const [showHidden, setShowHidden] = useState({});

  const handleArrow = (key) => {
    setShowHidden((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  };

  const renderMenu = (menu) => {
    return menu.map((sub) => {
      return (
        <button className="flex gap-2 hover:bg-slate-200 w-full">
          <p className="pl-9">{sub.emoji}</p>
          <p>{sub.label}</p>
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-50 font-Lato">
      {buttons.map((btn) => {
        return (
          <button className="flex flex-row gap-2 items-center hover:bg-slate-200 text-left py-2 px-3 w-full">
            {btn.icon}
            {btn.label}
          </button>
        );
      })}
      <hr className="border-t border-gray-400 border-0 my-3" />

      {menus.map((menu) => {
        return (
          <div className="w-full">
            <button
              className="flex flex-row items-center gap-2 w-full font-Lato px-3 hover:bg-slate-200 "
              onClick={() => {
                handleArrow(menu.label);
              }}
            >
              <div>{menu.icon}</div>
              <div className="flex flex-row w-full">
                <p className="py-2 ">{menu.label}</p>
              </div>
              <button className="mx-auto mr-0">
                {!showHidden[menu.label] ? (
                  <AiOutlineDown className="" />
                ) : (
                  <AiOutlineUp className="" />
                )}
              </button>
            </button>
            {showHidden[menu.label] && (
              <div className="flex flex-col gap-1">
                {menu.label === "Categories"
                  ? renderMenu(categories)
                  : renderMenu(tags)}
                <button className="flex flex-row items-center gap-2 text-gray-500 hover:bg-slate-200 w-full">
                  <div className="border-2 border-gray-300 rounded-sm ml-9">
                    <AiOutlinePlus />
                  </div>
                  <p>Add New {menu.label}</p>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
