import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { AiOutlinePlus, AiOutlineDown, AiOutlineRight } from "react-icons/ai";

import Modal from "../modal/Modal";
import MenuItem from "./MenuItem";
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
  const [showEdit, setShowEdit] = useState();
  const [showDelete, setShowDelete] = useState();

  const [pathName, setPathName] = useState("");

  const router = useRouter();

  useEffect(() => {
    setShowEdit(Array(contents.length).fill(false));
    setShowDelete(Array(contents.length).fill(false));
  }, [contents]);

  useEffect(() => {
    setPathName(decodeURIComponent(router.query.path));
  }, [router.asPath]);

  useEffect(() => {
    console.log("showDelete: ", showDelete);
  }, [showDelete]);

  const renderMenuItems = (menuItem) => {
    const toggleFlag = (currentIndex, currentFlags, setFlags) => {
      const newState = currentFlags.map((state, idx) =>
        idx === currentIndex ? !state : false
      );
      setFlags(newState);
    };

    const toggleEditFlag = (i) => {
      toggleFlag(i, showEdit, setShowEdit);
    };

    const toggleDeleteFlag = (i) => {
      toggleFlag(i, showDelete, setShowDelete);
    };

    return menuItem.map((subMenu, i) => {
      const { id, name, emoji } = subMenu;
      const props = {
        pathName,
        id,
        name,
        emoji,
        isShowEdit: showEdit[i],
        isShowDelete: showDelete[i],
        label,
        onSubmitDone,
        toggleEditFlag: () => toggleEditFlag(i),
        toggleDeleteFlag: () => toggleDeleteFlag(i),
      };
      return <MenuItem {...props} />;
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
            openMenu={() => setShowHidden(true)}
          />
        </Modal>
      )}
      <div className="group flex bg-slate-50 hover:bg-slate-200 items-center">
        <div className="flex-grow">
          <button
            className="flex flex-row items-center gap-2 w-full font-Lato px-3 hover:bg-slate-200 "
            onClick={() => {
              setShowHidden(!showHidden);
            }}
          >
            {!showHidden ? <AiOutlineRight /> : <AiOutlineDown />}
            <div>{icon}</div>
            <div className="flex flex-row w-full">
              <p className="py-2 ">{title}</p>
            </div>
          </button>
        </div>
        <div className="flex-shrink-0 mx-2">
          <button
            className="p-1 z-10 text-sm hover:bg-slate-50 rounded-md"
            onClick={() => setShowModal(!showModal)}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      {showHidden && (
        <div className="flex flex-row w-full relative">
          <div className="absolute border-r h-full ml-[1.15rem] my-1 border-gray-400"></div>
          <div className="flex flex-col w-full ">
            {renderMenuItems(contents)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarDropdownMenuItem;
