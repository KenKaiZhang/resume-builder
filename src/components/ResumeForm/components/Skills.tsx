import type { SkillData } from "@/types";
import { Button } from "../../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import { initialSkill } from "@/constants"; // Assuming you have initialProject

interface SkillsProps {
  data?: SkillData[];
  setData: (newValue: SkillData[]) => void;
}

const Skills: React.FC<SkillsProps> = ({ data = [], setData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const key = e.target.id as keyof SkillData;
    const value = e.target.value;

    const targetSkill: SkillData = { ...data[i] };
    targetSkill[key] = value;

    const newData = [...data];
    newData[i] = targetSkill;

    setData(newData);
  };

  const handleAdd = () => {
    const newData = [...data, initialSkill];
    setData(newData);
  };

  const handleRemove = (i: number) => {
    const newData = data.filter((_, idx) => idx !== i);
    setData(newData);
  };

  return (
    <section className="flex flex-col gap-4">
      {data.map((entry, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 border-1 px-4 pt-2 pb-4 rounded-lg"
        >
          <div className="flex justify-between">
            <h3>{`Skill ${i + 1}`}</h3>
            <Button variant="ghost" onClick={() => handleRemove(i)}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <div className="flex-1">
            <FormInput
              id="category"
              type="input"
              label="Category"
              value={entry?.category}
              placeholder="Technical"
              onChange={(e) => handleChange(e, i)}
            />
          </div>
          <div>
            <FormInput
              id="skills"
              type="textarea"
              label="Skills (comma separated)"
              value={entry?.skills}
              placeholder="Describe the skills you have"
              onChange={(e) => handleChange(e, i)}
            />
          </div>
        </div>
      ))}
      <Button onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} />
        <p>Add New Skill</p>
      </Button>
    </section>
  );
};

export default Skills;
