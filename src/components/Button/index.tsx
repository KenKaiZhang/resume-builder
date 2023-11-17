import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ButtonProps {
  innerText: string;
  innerIcon: any;
  onClick?: any;
}

export const Button = (props: ButtonProps) => {
  const { innerText, innerIcon, onClick } = props;

  return (
    <button className="w-full h-full bg-white/25 shadow-md rounded-[15px] hover:bg-black/25 duration-[0.25s] cursor-pointer" onClick={onClick}>
      <div className="w-full h-full flex justify-center items-center gap-4 pointer-events-none">
        <p>{innerText}</p>
        <FontAwesomeIcon icon={innerIcon} />
      </div>
    </button>
  );
};
