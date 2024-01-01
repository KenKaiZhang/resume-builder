import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleButton } from "../../components/CircleButton";
import { DraggableList } from "../../components/DraggableList";
import { ExperienceEditor } from "../../components/Editor/Experience";
import { useEffect, useState } from "react";
import { SectionHandler } from "../../handlers/sectionHandler";
import { useAppSelector } from "../../app/hook";
import { updateCurrent, updateHistory } from "../../features/experience/experienceSlice";

export const ExperienceInfo = () => {
  // Redux state containing a list of Expereince objects
  const current: Experience = useAppSelector((state) => state.experience.current);
  const history: Experience[] = useAppSelector((state) => state.experience.history);

  // Need to conver the list to DragDrop format
  const [experienceList, setExperienceList] = useState<DragDropList[]>([]);

  useEffect(() => {
    if (history) {
      const newList = history.map((experience: Experience) => {
        return { id: experience.id, summary: `${experience.position} @${experience.company}` };
      });
      setExperienceList(newList);
    }
  }, [history]);

  // Since all the sections use basically the same handler functions, I made a reusable class
  const handler = new SectionHandler(current, updateCurrent, history, updateHistory);

  return (
    <div className="mt-8">
      <p className="font-bold text-[1.5rem]">Work Experience</p>
      <div className="mt-2 w-full">
        <DraggableList
          name="edu"
          list={experienceList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e)}
          onButtonClick={(e: any) => handler.handleRemoveHistory(e)}
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
        <ExperienceEditor />
      </div>
    </div>
  );
};
