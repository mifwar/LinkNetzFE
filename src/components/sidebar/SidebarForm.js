import { useState, useContext } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { FaCaretRight } from "react-icons/fa";

import { TokenContext } from "../../pages/_app";

const SidebarForm = ({ label, showModal, onSubmitDone }) => {
  const [emoji, setEmoji] = useState("📁");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [countName, setCountName] = useState(0);
  const { token } = useContext(TokenContext);

  const maxLength = 30;

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const payload = JSON.stringify({ emoji, name });

    const requestOptions = {
      method: "POST",
      credential: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: payload,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/add/${label.toLowerCase()}`,
      requestOptions
    );

    const res = await response.json();

    if (res) {
      onSubmitDone();
    }

    showModal(false);
  };

  return (
    <form
      className="flex flex-col items-center px-3"
      onSubmit={handleSubmitForm}
    >
      <div className="flex gap-2 w-full">
        <button
          className="flex flex-col justify-center text-xl hover:bg-slate-200 px-2 rounded-md"
          type="button"
          onClick={() => setEmojiPicker(!emojiPicker)}
        >
          <div>{emoji}</div>
          <div className="text-sm text-gray-600 absolute rotate-45 translate-x-4 translate-y-3">
            <FaCaretRight />
          </div>
        </button>
        {emojiPicker && (
          <div className="absolute translate-x-10 -translate-y-20">
            <Picker
              data={data}
              onEmojiSelect={(selectedEmoji) => {
                setEmoji(selectedEmoji.native);
                setEmojiPicker(false);
              }}
              previewPosition={"none"}
              skinTonePosition={"none"}
              autoFocus={true}
            />
          </div>
        )}
        <input
          className="py-2 px-3 border rounded-md w-full "
          maxLength={maxLength}
          placeholder={`${label} Name`}
          onChange={(event) => {
            setName(event.target.value);
            setCountName(event.target.value.length);
          }}
          required
        />
      </div>
      <p className="flex mx-auto mr-0 text-xs text-gray-400">
        {countName}/{maxLength}
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-400 text-white rounded-md p-2 mt-2 w-24"
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default SidebarForm;
