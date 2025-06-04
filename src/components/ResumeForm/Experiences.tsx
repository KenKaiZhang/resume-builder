import type { ExperienceData } from "@/types";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import { initialExperience } from "@/constants"; // Assuming you have initialExperience
import { faBriefcase } from "@fortawesome/free-solid-svg-icons/faBriefcase";

interface ExperienceProps {
  data?: ExperienceData[];
  setData: any;
}

const Experiences: React.FC<ExperienceProps> = ({ data = [], setData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const key = e.target.id as keyof ExperienceData;
    const value = e.target.value;

    const targetExp: ExperienceData = { ...data[i] };
    targetExp[key] = value;

    const newData = [...data];
    newData[i] = targetExp;

    setData(newData);
  };

  const handleAdd = () => {
    const newData = [...data, initialExperience];
    setData(newData);
  };

  const handleRemove = (i: number) => {
    const newData = data.filter((_, idx) => idx !== i);
    setData(newData);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faBriefcase} className="text-sm mt-0.5" />
        <h1>Experience</h1>
      </div>
      {data.map((entry, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 border-1 px-4 pt-2 pb-4 rounded-lg"
        >
          <div className="flex justify-between">
            <h3>{`Experience ${i + 1}`}</h3>
            <Button variant="ghost" onClick={() => handleRemove(i)}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormInput
                id="company"
                type="input"
                label="Company"
                value={entry?.company}
                placeholder="Company Name"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
            <div className="flex-1">
              <FormInput
                id="title"
                type="input"
                label="Title"
                value={entry?.title}
                placeholder="Software Engineer"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-2">
              <FormInput
                id="location"
                type="input"
                label="Location"
                value={entry?.location}
                placeholder="City, State or Remote"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
            <div className="flex-1">
              <FormInput
                id="years"
                type="input"
                label="Years"
                value={entry.years}
                placeholder="2022 - Present or 2020 - 2022"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
          </div>
          <div>
            <FormInput
              id="description"
              type="textarea"
              label="Description"
              value={entry?.description}
              placeholder="Responsibilities and achievements..."
              onChange={(e) => handleChange(e, i)}
            />
          </div>
        </div>
      ))}
      <Button onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} />
        <p>Add New Experience</p>
      </Button>
    </section>
  );
};

export default Experiences;
