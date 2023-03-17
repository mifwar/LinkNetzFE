import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { RiCloseCircleFill } from "react-icons/ri";

const Notification = (props) => {
  const { message, setMessage } = props;
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    setIsVisible(!!message);
  }, [message]);

  return (
    <div className="flex mx-auto justify-center max-w-xl">
      <div
        className={
          isVisible
            ? "flex items-center bg-red-100 border-red-700 border py-2 mx-8 px-2 my-2"
            : "hidden"
        }
      >
        <RiCloseCircleFill className="text-2xl text-red-700 mr-2" />
        <p className="text-red-700 w-full">{message}</p>

        <IoMdClose
          className="text-lg text-red-700 mr-0 mx-3 cursor-pointer hover:text-red-500"
          onClick={() => {
            setMessage("");
          }}
        />
      </div>
    </div>
  );
};
export default Notification;
