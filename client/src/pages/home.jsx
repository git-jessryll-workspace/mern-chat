import { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/chat";

export default function () {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center pt-[19px] overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar />
        {activeConversation._id ? <ChatContainer/> : <WhatsappHome />}
      </div>
    </div>
  );
}
