import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { getConversationId } from "../../../utils/chat";

export default function Conversations({ onlineUsers }) {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const {user} = useSelector((state) => state.user)
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((convo) => {
              let check = onlineUsers.find(
                (u) => u.userId === getConversationId(user, convo.users)
              );
              return (
                <Conversation
                  key={convo._id}
                  convo={convo}
                  online={check ? true : false}
                />
              );
            })}
      </ul>
    </div>
  );
}
