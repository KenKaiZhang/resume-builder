import type { EducationData } from "@/types";
import { Button } from "../../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import { initialEducation } from "@/constants";

interface EducationProps {
  data?: EducationData[];
  setData: (newValue: EducationData[]) => void;
}

const Educations: React.FC<EducationProps> = ({ data = [], setData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const key = e.target.id as keyof EducationData;
    const value = e.target.value;

    const targetEdu: EducationData = { ...data[i] };
    targetEdu[key] = value;

    const newData = [...data];
    newData[i] = targetEdu;

    setData(newData);
  };

  const handleAdd = () => {
    const newData = [...data, initialEducation];
    setData(newData);
  };

  const handleRemove = (i: number) => {
    const newData = data.filter((_, idx) => idx !== i);
    setData(newData);
  };

  return (
    <section className="flex flex-col gap-4">
      {data.map((entry, i) => (
        <div key={i} className="flex flex-col gap-4 border-1 px-4 pt-2 pb-4 rounded-lg">
          <div className="flex justify-between">
            <h3>{`Education ${i + 1}`}</h3>
            <Button variant="ghost" onClick={() => handleRemove(i)}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormInput
                id="school"
                type="input"
                label="School"
                value={entry?.school}
                placeholder="University Name"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
            <div className="flex-1">
              <FormInput
                id="degree"
                type="input"
                label="Degree"
                value={entry?.degree}
                placeholder="B.S. Computer Science"
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
                placeholder="City, State"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
            <div className="flex-1">
              <FormInput id="gpa" type="input" label="GPA" value={entry.gpa} placeholder="4.0" onChange={(e) => handleChange(e, i)} />
            </div>
            <div className="flex-2">
              <FormInput
                id="years"
                type="input"
                label="Years"
                value={entry.years}
                placeholder="2021 - 2025 or Expected 2025"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
          </div>
          <div>
            <FormInput
              id="classes"
              type="textarea"
              label="Relevant Coursework (comma separated)"
              value={entry?.classes}
              placeholder="Machine Learning, Networking, etc."
              onChange={(e) => handleChange(e, i)}
            />
          </div>
        </div>
      ))}
      <Button onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} />
        <p>Add New Education</p>
      </Button>
    </section>
  );
};

export default Educations;
