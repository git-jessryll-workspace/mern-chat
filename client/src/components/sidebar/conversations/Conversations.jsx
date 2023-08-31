import { useSelector } from "react-redux";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((convo) => <Conversation key={convo._id} convo={convo} />)}
      </ul>
    </div>
  );
}
