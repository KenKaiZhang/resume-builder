import { useEffect, useState } from "react";
import { DraggableList } from "../../components/DraggableList";
import { EducationEditor } from "../../components/Editor/Education";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleButton } from "../../components/CircleButton";
import { SectionHandler } from "../../handlers/sectionHandler";

export interface EducationInfoProps {
  info: Education[];
  update: any;
}

export const EducationInfo = (props: EducationInfoProps) => {
  const { info, update } = props;
  const [current, setCurrent] = useState<Education>({});
  const [educationList, setEducationList] = useState<DragDropList[]>([]);

  useEffect(() => {
    console.log(info);
    if (info) {
      const newList = info.map((education: Education) => {
        return { id: education.id, summary: education.school };
      });
      setEducationList(newList);
    }
  }, [info]);

  useEffect(() => console.log(current), [current]);

  const handler = new SectionHandler(info, update, current, setCurrent);

  return (
    <div className="mt-8">
      <p className="font-bold text-[1.5rem]">Education</p>
      <div className="mt-2 w-full">
        <DraggableList
          name="edu"
          list={educationList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e)}
          onButtonClick={(e: any) => handler.handleRemoveInfo(e)}
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
        <EducationEditor info={current} update={handler.handleCurrentChanges} />
      </div>
    </div>
  );
};
