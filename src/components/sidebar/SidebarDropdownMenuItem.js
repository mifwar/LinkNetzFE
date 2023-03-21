import { useState } from "react";
import { AiOutlinePlus, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

import Modal from "../modal/Modal";
import SidebarForm from "./SidebarForm";

const SidebarDropdownMenuItem = ({
  title,
  label,
  icon,
  contents,
  onSubmitDone,
}) => {
  const [showHidden, setShowHidden] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const renderMenuItems = (menuItem) => {
    return menuItem.map((sub, i) => {
      return (
        <button
          className="group flex gap-2 items-center hover:bg-slate-200 pl-9 pr-3 overflow-ellipsis"
          key={i}
        >
          <p className="">{sub.emoji}</p>
          <p className="w-full text-left truncate">{sub.name}</p>
          <button className="invisible group-hover:visible hover:bg-slate-100 p-1 mx-auto mr-0">
            <BsThreeDotsVertical />
          </button>
        </button>
      );
    });
  };

  return (
    <div className="w-full">
      {showModal && (
        <Modal title={`Add New ${label}`} setShowModal={setShowModal}>
          <SidebarForm
            label={label}
            showModal={setShowModal}
            onSubmitDone={onSubmitDone}
          />
        </Modal>
      )}
      <button
        className="flex flex-row items-center gap-2 w-full font-Lato px-3 hover:bg-slate-200 "
        onClick={() => {
          setShowHidden(!showHidden);
        }}
      >
        <div>{icon}</div>
        <div className="flex flex-row w-full">
          <p className="py-2 ">{title}</p>
        </div>
        <div className="mx-auto mr-0">
          {!showHidden ? <AiOutlineDown /> : <AiOutlineUp />}
        </div>
      </button>
      {showHidden && (
        <div className="flex flex-col gap-1 ">
          {renderMenuItems(contents)}
          <button
            className="flex flex-row items-center gap-2 text-gray-500 hover:bg-slate-200 w-full px-9"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <div className="border-2 border-gray-300 rounded-sm text-xs">
              <AiOutlinePlus />
            </div>
            <p>Add New {label}</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarDropdownMenuItem;
