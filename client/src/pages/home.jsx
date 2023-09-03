import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/chat";
import SocketContext from "../context/SocketContext";

function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    socket.emit("join", user._id);
      if (user) {
        dispatch(getConversations(user.token));
      }
      socket.on('get-online-users', (userIds) => {
        setOnlineUsers(userIds);
      })
  });
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center pt-[19px] overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar onlineUsers={onlineUsers}/>
        {activeConversation._id ? <ChatContainer onlineUsers={onlineUsers}/> : <WhatsappHome />}
      </div>
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
