import { faCircleXmark, faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleButton } from "../CircleButton";

export interface ListItemProps {
  id: string;
  name: string;
  onButtonClick: any;
  onItemClick: any;
}

export const ListItem = (props: ListItemProps) => {
  const { id, name, onButtonClick, onItemClick } = props;
  const buttonIcon: JSX.Element = <FontAwesomeIcon icon={faCircleXmark} className="h-full pointer-events-none" />;

  return (
    <div
      id={id}
      className="relative py-2 px-2 h-[45px] grid grid-cols-item items-center rounded-[15px] gap-4 cursor-pointer bg-white/25 shadow-md hover:bg-blue-300/50"
    >
      <FontAwesomeIcon icon={faGripLinesVertical} />
      <button className="relative whitespace-nowrap text-ellipses text-[1rem] truncate text-left" onClick={onItemClick}>
        {name}
      </button>
      <CircleButton inner={buttonIcon} dim={20} onClick={onButtonClick} />
    </div>
  );
};
