import { useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";

export default function Search({ searchLength, setSearchResults }) {
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const handleSearch = async (event) => {
    let keyword = event.target.value;
    if (keyword.length && event.key === "Enter") {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/user?search=${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setSearchResults(data);
      } catch (error) {}
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="h-[49px] py-1.5">
      <div className="px-[10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span className="w-8 flex items-center justify-center rotateAnimation cursor-pointer" onClick={() => setSearchResults([])}>
                <ReturnIcon className={"fill-green_1 w-5"} />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <SearchIcon className={"dark:fill-dark_svg_2 w-5"} />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={handleSearch}
            />
          </div>
          <button className="btn">
            <FilterIcon className={"dark:fill-dark_svg_1"} />
          </button>
        </div>
      </div>
    </div>
  );
}
