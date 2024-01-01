import { useState } from "react";
import { CircleButton } from "../CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignIn, faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const UserButton = () => {
  const [open, setOpen] = useState<Boolean>(false);

  return (
    <div id="user-button" className="relative w-full h-[45px] flex justify-center items-center cursor-pointer">
      <div id="button" className="absolute w-full h-full bg-white rounded-full justify-center items-center flex" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div
        id="actions"
        className="absolute w-[90%] top-[60px]  bg-black/50 rounded-full duration-300 overflow-hidden"
        style={{ height: open ? "125px" : "0px" }}
      >
        <div className="py-2 h-full grid grid-row-2 gap-4">
          <CircleButton inner={<FontAwesomeIcon icon={faSignIn} className="w-[65%] h-full justify-center items-center opacity-90" />} dim={"100%"} />
          <CircleButton inner={<FontAwesomeIcon icon={faGear} className="w-[65%]  h-full justify-center items-center opacity-90" />} dim={"100%"} />
        </div>
      </div>
    </div>
  );
};
