import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../svg";

export default function ChatHeader({ online, typing }) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              src={
                picture ||
                "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
              }
              alt={`${name} picture`}
              className="w-full h-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {name.split(" ")[0]}
            </h1>
            {typing == activeConversation._id ? (
              <span className="text-xs dark:text-dark_svg_2">Typing...</span>
            ) : (
              <span className="text-xs dark:text-dark_svg_2">
                {online && "online"}
              </span>
            )}
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className={"dark:fill-dark_svg_1"} />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className={"dark:fill-dark_svg_1"} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
