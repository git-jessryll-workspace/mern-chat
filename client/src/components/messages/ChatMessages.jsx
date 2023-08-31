import { useSelector } from "react-redux";
import Message from "./Message";

export default function ChatMessages() {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className={`mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat`}
    >
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {messages &&
          messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              me={message.sender._id === user._id}
            />
          ))}
      </div>
    </div>
  );
}
