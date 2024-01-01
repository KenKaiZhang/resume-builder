import React from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleButton } from "../CircleButton";
import { capitalize } from "../../utils/capitalize";

export interface ListInputProps {
  section: string;
  name: string;
  onClick?: any;
}

export const ListInput = (props: ListInputProps) => {
  const { section, name, onClick } = props;
  return (
    <React.Fragment>
      <p>{capitalize(name)}</p>
      <div className="relative my-4 px-4 h-[45px] w-full flex border-white-solid rounded-[20px]">
        <input id={`new-${section}-${name}`} type="text" className="h-full w-full" data-edit={-1} />
        <div className="absolute right-2 h-full center">
          <CircleButton inner={<FontAwesomeIcon icon={faCirclePlus} className="h-full pointer-events-none" />} dim={20} onClick={onClick} />
        </div>
      </div>
    </React.Fragment>
  );
};
