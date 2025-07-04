import type { PersonalInfoData } from "@/types";
import FormInput from "./FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface PersonalInfoProps {
  data: PersonalInfoData;
  setData: (newValue: PersonalInfoData) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, setData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    const value = e.target.value;

    setData({ ...data, [key]: value });
  };

  return (
    <section className="">
      <div className="flex mb-2 gap-2 items-center">
        <FontAwesomeIcon icon={faUser} className="text-sm mt-0.5" />
        <h1>Personal Information</h1>
      </div>
      <div className="px-2 flex flex-col gap-4">
        <div className="flex gap-4">
          <FormInput
            id="name"
            type="input"
            label="Full Name"
            value={data?.name}
            onChange={handleChange}
            placeholder="Ken Zhang"
          />
          <FormInput
            id="address"
            type="input"
            label="Address"
            value={data?.address}
            onChange={handleChange}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="flex gap-4">
          <FormInput
            id="email"
            type="input"
            label="Email Address"
            value={data?.email}
            onChange={handleChange}
            placeholder="zhangkenkai@gmail.com"
          />
          <FormInput
            id="phone"
            type="input"
            label="Phone"
            value={data?.phone}
            onChange={handleChange}
            placeholder="(123)-456-7890"
          />
        </div>
        <FormInput
          id="links"
          type="textarea"
          label="Relevant Links (e.g., LinkedIn, Portfolio, GitHub - comma separated)"
          value={data?.links}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/chen-kai-zhang/, https://github.com/KenKaiZhang"
        />
      </div>
    </section>
  );
};

export default PersonalInfo;
