import { useEffect, useState } from "react";
import { DraggableList } from "../../components/DraggableList";
import { EducationEditor } from "../../components/Editor/Education";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleButton } from "../../components/CircleButton";
import { SectionHandler } from "../../handlers/sectionHandler";
import { useAppSelector } from "../../app/hook";
import { updateCurrent, updateHistory } from "../../features/education/educationSlice";

export const EducationInfo = () => {
  // Redux state containing a list of Education objects
  const current: Education = useAppSelector((state) => state.education.current);
  const history: Education[] = useAppSelector((state) => state.education.history);

  // Need to conver the list to DragDrop format
  const [educationList, setEducationList] = useState<DragDropList[]>([]);

  // Set the list to be in DragDrop usable
  useEffect(() => {
    if (history) {
      const newList = history.map((education: Education) => {
        return { id: education.id, summary: education.school };
      });
      setEducationList(newList);
    }
  }, [history]);

  // Since all the sections use basically the same handler functions, I made a reusable class
  const handler = new SectionHandler(current, updateCurrent, history, updateHistory);

  return (
    <div className="mt-8">
      <p className="font-bold text-[1.5rem]">Education</p>
      <div className="mt-2 w-full">
        <DraggableList
          name="edu"
          list={educationList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e)}
          onButtonClick={(e: any) => handler.handleRemoveHistory(e)}
          onItemClick={(e: any) => handler.handleEditPrevious(e)}
          horizontal
        />
      </div>
      <div className="relative mt-4 w-full">
        <div className="absolute z-40 top-2 right-2">
          <CircleButton
            inner={<FontAwesomeIcon icon={faCirclePlus} className="h-full pointer-events-none" />}
            dim={20}
            onClick={handler.handleSubmitCurrent}
          />
        </div>
        <EducationEditor />
      </div>
    </div>
  );
};
