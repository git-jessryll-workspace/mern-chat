import { useDispatch, useSelector } from "react-redux";
import { dateHandler } from "../../../utils/date";
import { open_create_conversation } from "../../../features/chatSlice";
import { getConversationId } from "../../../utils/chat";

export default function Conversation({ convo }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const openConversation = async () => {
    const values = {
      token: user.token,
      receiver_id: getConversationId(user, convo.users),
    };
    dispatch(open_create_conversation(values));
  };

  return (
    <li
      onClick={openConversation}
      className={`${activeConversation._id === convo._id && "dark:bg-dark_bg_2"} list-none h-[72px] w-full dark:bg-dark_bg_1 ${convo._id !== activeConversation._id && "hover:dark:bg-dark_bg_2"} cursor-pointer dark:text-dark_text_1 px-[10px]`}
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={
                convo.picture ||
                "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
              }
              alt={convo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2 capitalize">
              {convo.name}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2 truncate">
                  <p className="truncate">
                    {convo.latestMessage?.message.length > 20
                      ? `${convo.latestMessage?.message.substring(0, 20)}...`
                      : convo.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {convo.latestMessage?.createdAt &&
              dateHandler(convo.latestMessage?.createdAt)}
          </span>
          {/* <span>{moment(convo.latestMessage.createdAt).fromNow(true)}</span> */}
        </div>
      </div>
      <div className="ml-16 border-b border-b-dark_border_1"></div>
    </li>
  );
}
