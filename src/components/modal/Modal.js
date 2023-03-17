import { useRef, useEffect } from "react";

import { IoMdClose } from "react-icons/io";

export default ({ setShowModal, title, children }) => {
  const menuRef = useRef();

  const handler = (e) => {
    if (!menuRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="fixed top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-30">
      <div
        className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg"
        ref={menuRef}
      >
        <div className="flex flex-row">
          <p className="text-lg font-bold">{title}</p>
          <div className="mx-auto mr-0">
            <button
              className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-slate-200 p-2"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
