import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../features/chatSlice";
import { getConversationId } from "../../../utils/chat";
import SocketContext from "../../../context/SocketContext";

function Contact({ contact, setSearchResults, socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const openConversation = async () => {
    const values = {
      token: user.token,
      receiver_id: contact._id,
    };
    const newConvo = await dispatch(open_create_conversation(values));
    // setSearchResults([])
    socket.emit('join conversation', newConvo.payload._id)
  };
  return (
    <li
      onClick={openConversation}
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      <div className="flex items-center gap-x-3 py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={
                contact.picture ||
                "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
              }
              alt={contact.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {contact.name}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-16 border-b border-b-dark_border_1"></div>
    </li>
  );
}


const ContactWithContext = (props) => <SocketContext.Consumer>
  {(socket) => <Contact {...props} socket={socket}/>}
</SocketContext.Consumer>


export default ContactWithContext