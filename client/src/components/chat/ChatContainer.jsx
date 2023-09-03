import React, { useEffect } from "react";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "../messages/ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../features/chatSlice";
import { ChatActions } from "./actions";
import { checkOnlineStatus, getConversationId } from "../../utils/chat";

export default function ChatContainer({onlineUsers}) {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  useEffect(() => {
    if (activeConversation?._id) {
      const values = {
        token,
        convo_id: activeConversation?._id,
      };
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      <div>
        <ChatHeader online={checkOnlineStatus(onlineUsers, user, activeConversation.users)}/>
        <ChatMessages />
        <ChatActions/>
      </div>
    </div>
  );
}
