export interface CircleButtonProps {
  inner: any;
  dim: number;
  onClick: any;
}

export const CircleButton = (props: CircleButtonProps) => {
  const { inner, dim, onClick } = props;
  return (
    <button className="relative z-50" style={{ height: dim, width: dim }} onClick={onClick}>
      {inner}
    </button>
  );
};
