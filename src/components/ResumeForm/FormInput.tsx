import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface FormInputProps {
  id: string;
  type: string;
  label: string;
  value?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  label,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="flex-1">
      <Label className="mb-1">{label}</Label>
      {type === "input" ? (
        <Input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <Textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormInput;
