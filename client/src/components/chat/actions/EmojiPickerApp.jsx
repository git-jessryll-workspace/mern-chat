import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { EmojiIcon } from "../../../svg";

export default function EmojiPickerApp({
  textRef,
  message,
  setMessage,
  showPicker,
  setShowPicker,
  setShowAttachments,
}) {
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (emojiData) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const nextText = start + emoji + end;
    setMessage(nextText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() =>
          setShowPicker((showPicker) => {
            if (!showPicker) {
              setShowAttachments(false);
            }
            return !showPicker;
          })
        }
      >
        <EmojiIcon className={"dark:fill-dark_svg_1"} />
      </button>
      {showPicker && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
}
