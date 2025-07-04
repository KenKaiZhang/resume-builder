import type { ProjectData } from "@/types";
import { Button } from "../../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import { initialProject } from "@/constants"; // Assuming you have initialProject

interface ProjectsProps {
  data?: ProjectData[];
  setData: (newValue: ProjectData[]) => void;
}

const Projects: React.FC<ProjectsProps> = ({ data = [], setData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const key = e.target.id as keyof ProjectData;
    const value = e.target.value;

    const targetProject: ProjectData = { ...data[i] };
    targetProject[key] = value;

    const newData = [...data];
    newData[i] = targetProject;

    setData(newData);
  };

  const handleAdd = () => {
    const newData = [...data, initialProject];
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
            <h3>{`Project ${i + 1}`}</h3>
            <Button variant="ghost" onClick={() => handleRemove(i)}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <div className="flex-1">
            <FormInput
              id="title"
              type="input"
              label="Project Title"
              value={entry?.title}
              placeholder="My Awesome Project"
              onChange={(e) => handleChange(e, i)}
            />
          </div>
          <div className="flex-1">
            <FormInput
              id="technologies"
              type="input"
              label="Technologies Used (comma separated)"
              value={entry?.technologies}
              placeholder="React, Node.js, MongoDB"
              onChange={(e) => handleChange(e, i)}
            />
          </div>
          <div>
            <FormInput
              id="link"
              type="input"
              label="Project Link (comma separated) (Optional)"
              value={entry?.link}
              placeholder="https://github.com/my-project"
              onChange={(e) => handleChange(e, i)}
            />
          </div>
          <div>
            <FormInput
              id="description"
              type="textarea"
              label="Description (double line separated)"
              value={entry?.description}
              placeholder="Briefly describe your project and its features."
              onChange={(e) => handleChange(e, i)}
            />
          </div>
        </div>
      ))}
      <Button onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} />
        <p>Add New Project</p>
      </Button>
    </section>
  );
};

export default Projects;
