import { useRef, useState } from "react";
import EmojiPickerApp from "./EmojiPickerApp";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chatSlice";
import { ClipLoader } from "react-spinners";
import { Attachments } from "./attachments";
import SocketContext from "../../../context/SocketContext";

function ChatActions({socket}) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const { activeConversation, status } = useSelector((state) => state.chat);
  const textRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newMessage = await dispatch(
      sendMessage({
        token,
        convo_id: activeConversation._id,
        files: [],
        message,
      })
    );
    socket.emit('send message', newMessage.payload)
    setLoading(false);
    setMessage("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showPicker={showEmoji}
            setShowPicker={setShowEmoji}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            setShowAttachments={setShowAttachments}
            showAttachments={showAttachments}
            setShowEmoji={setShowEmoji}
          />
        </ul>
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        <button disabled={loading} className="btn" type="submit">
          {loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className={"dark:fill-dark_svg_1"} />
          )}
        </button>
      </div>
    </form>
  );
}

const ChatActionsWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatActionsWithContext;
