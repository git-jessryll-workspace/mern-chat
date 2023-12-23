import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/chat";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";

function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  useEffect(() => {
    socket.emit("join", user._id);
    socket.on("get-online-users", (userIds) => {
      setOnlineUsers(userIds);
    });
  }, [user]);
  useEffect(() => {
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
  }, [activeConversation]);
  useEffect(() => {
    socket.on("typing-receive", (conversation) => {
      setTyping(conversation);
    });
    socket.on("stop typing", (conversation) => setTyping(false));
  });
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center pt-[19px] overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar onlineUsers={onlineUsers} typing={typing} />
        {activeConversation._id ? (
          <ChatContainer onlineUsers={onlineUsers} typing={typing} />
        ) : (
          <WhatsappHome />
        )}
      </div>
      <Call />
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
