import React, { useEffect, useState } from "react";
import { AttachmentIcon } from "../../../../svg";
import Menu from "./Menu";

export default function Attachments({
  showAttachments,
  setShowAttachments,
  setShowEmoji,
}) {
  return (
    <li className="relative">
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShowAttachments((prev) => {
            if (!prev) {
              setShowEmoji(false);
            }
            return !prev;
          });
        }}
      >
        <AttachmentIcon className={"dark:fill-dark_svg_1"} />
      </button>
      {/* Menu */}
      {showAttachments && <Menu />}
    </li>
  );
}
