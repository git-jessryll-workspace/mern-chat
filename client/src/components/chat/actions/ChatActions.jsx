import { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import Attachments from "./Attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chatSlice";
import {ClipLoader} from "react-spinners"

export default function ChatActions() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const { activeConversation, status } = useSelector((state) => state.chat);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      sendMessage({
        token,
        convo_id: activeConversation._id,
        files: [],
        message,
      })
    );
    setMessage("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPicker />
          <Attachments />
        </ul>
        <Input message={message} setMessage={setMessage} />
        <button className="btn" type="submit">
          {status === 'loading' ? <ClipLoader color="#E9EDEF" size={25}/> : <SendIcon className={"dark:fill-dark_svg_1"} />}
        </button>
      </div>
    </form>
  );
}
