import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { FaCaretRight } from "react-icons/fa";

export default ({ label }) => {
  const [emoji, setEmoji] = useState("📁");
  const [emojiPicker, setEmojiPicker] = useState(false);

  return (
    <div className="flex flex-col items-center px-3 gap-3">
      <div className="flex gap-2 w-full">
        <button
          className="flex flex-col justify-center text-xl hover:bg-slate-200 px-2 rounded-md"
          onClick={() => {
            setEmojiPicker(!emojiPicker);
          }}
        >
          <div>{emoji}</div>
          <div className="text-sm text-gray-600 absolute rotate-45 translate-x-4 translate-y-3">
            <FaCaretRight />
          </div>
        </button>
        {emojiPicker && (
          <div className="absolute translate-x-10 -translate-y-12">
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
          maxLength={30}
          placeholder={`${label} Name`}
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-400 text-white rounded-md p-2 w-24">
        Save
      </button>
    </div>
  );
};
