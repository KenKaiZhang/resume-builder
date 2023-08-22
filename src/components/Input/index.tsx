export interface InputProps {
  id: string;
  value?: string;
  placeholder: string;
  onChange: any;
}

export const Input = (props: InputProps) => {
  const { id, value, placeholder, onChange } = props;
  return (
    <div className="relative">
      <input id={id} className="w-full" type="text" placeholder=" " value={value} onChange={onChange} />
      <label htmlFor={id} className="floating-label pointer-events-none">
        {placeholder}
      </label>
      <div className="absolute bottom-0 h-[2px] w-full bg-white" />
    </div>
  );
};
