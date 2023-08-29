import { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice";

export default function () {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.access_token));
    }
  }, [user]);
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container min-h-screen flex">
        <Sidebar />
      </div>
    </div>
  );
}
