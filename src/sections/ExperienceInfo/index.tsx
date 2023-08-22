import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleButton } from "../../components/CircleButton";
import { DraggableList } from "../../components/DraggableList";
import { ExperienceEditor } from "../../components/Editor/Experience";
import { useEffect, useState } from "react";
import { SectionHandler } from "../../handlers/sectionHandler";

export interface ExperienceInfoProps {
  info: Experience[];
  update: any;
}

export const ExperienceInfo = (props: ExperienceInfoProps) => {
  const { info, update } = props;
  const [current, setCurrent] = useState<Experience>({});
  const [experienceList, setExperienceList] = useState<DragDropList[]>([]);

  useEffect(() => {
    if (info) {
      const newList = info.map((experience: Experience) => {
        return { id: experience.id, summary: `${experience.position} @${experience.company}` };
      });
      setExperienceList(newList);
    }
  }, [info]);

  const handler = new SectionHandler(info, update, current, setCurrent);

  return (
    <div className="mt-8">
      <p className="font-bold">Work Experience</p>
      <div className="mt-4 w-full">
        <DraggableList
          name="edu"
          list={experienceList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e)}
          onButtonClick={(e: any) => handler.handleRemoveInfo(e)}
          onItemClick={(e: any) => handler.handleEditPrevious(e)}
          horizontal
        />
      </div>
      <div className="relative mt-4 w-full">
        <div className="absolute z-40 top-2 right-2">
          <CircleButton
            inner={<FontAwesomeIcon icon={faCirclePlus} className="h-full pointer-events-none " />}
            dim={20}
            onClick={handler.handleSubmitCurrent}
          />
        </div>
        <ExperienceEditor info={current} update={handler.handleCurrentChanges} />
      </div>
    </div>
  );
};
