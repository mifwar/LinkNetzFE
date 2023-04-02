import { useRouter } from "next/router";
import { useContext } from "react";

import { FiEdit3 } from "react-icons/fi";
import { TbTrash } from "react-icons/tb";

import Modal from "../modal/Modal";
import SidebarEditForm from "./form/SidebarEditForm";
import SidebarDeleteForm from "./form/SidebarDeleteForm";
import { TokenContext } from "../../pages/_app";

const MenuItem = ({
  pathName,
  id,
  name,
  emoji,
  isShowEdit,
  isShowDelete,
  label,
  onSubmitDone,
  toggleEditFlag,
  toggleDeleteFlag,
}) => {
  const router = useRouter();
  const { token } = useContext(TokenContext);

  const handleButtonClick = (event, name) => {
    event.preventDefault();
    const encoded = encodeURIComponent(name);
    router.push(`/category/${encoded}`);
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "DELETE",
      credential: "include",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${label.toLowerCase()}/${id}`,
        requestOptions
      );

      if (response) {
        onSubmitDone();
      }
    } catch {
      console.log("unable to delete");
    }
  };

  return (
    <>
      <div
        className={`group flex gap-2 items-center pl-9 pr-3 py-0.5 overflow-ellipsis w-full hover:bg-slate-200 cursor-pointer ${
          pathName === name ? "bg-slate-200" : ""
        }`}
        onClick={(event) => handleButtonClick(event, name)}
      >
        <p>{emoji}</p>
        <p className="w-full text-left truncate">{name}</p>

        {pathName === name && (
          <div className="flex">
            <button
              className="hover:bg-slate-100 p-1 mx-auto mr-0"
              onClick={toggleEditFlag}
              title={`edit ${label.toLowerCase()}`}
            >
              <FiEdit3 />
            </button>
            <button
              className="hover:bg-slate-100 p-1 mx-auto mr-0"
              onClick={toggleDeleteFlag}
              title={`delete ${label.toLowerCase()}`}
            >
              <TbTrash />
            </button>
          </div>
        )}
      </div>
      {isShowEdit && (
        <Modal title={`Edit ${label}`} setShowModal={toggleEditFlag}>
          <SidebarEditForm
            label={label}
            showModal={toggleEditFlag}
            onSubmitDone={onSubmitDone}
            id={id}
            currentName={name}
            currentEmoji={emoji}
          />
        </Modal>
      )}

      {isShowDelete && (
        <Modal title={`Delete ${label}`} setShowModal={toggleDeleteFlag}>
          <SidebarDeleteForm
            handleCancelClick={toggleDeleteFlag}
            handleDeleteClick={handleDeleteClick}
            label={name}
          />
        </Modal>
      )}
    </>
  );
};

export default MenuItem;
