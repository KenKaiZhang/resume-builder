import { useState, useEffect } from "react";
import { SectionHandler } from "../../handlers/sectionHandler";
import { DraggableList } from "../../components/DraggableList";
import { CircleButton } from "../../components/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ProjectEditor } from "../../components/Editor/Project";
import { useAppSelector } from "../../app/hook";
import { updateCurrent, updateHistory } from "../../features/project/projectSlice";

export const ProjectInfo = () => {
  // Redux state containing a list of Expereince objects
  const current: Project = useAppSelector((state) => state.project.current);
  const history: Project[] = useAppSelector((state) => state.project.history);

  // Need to conver the list to DragDrop format
  const [projectList, setProjectList] = useState<DragDropList[]>([]);

  useEffect(() => {
    if (history) {
      const newList = history.map((project: Project) => {
        return { id: project.id, summary: project.name };
      });
      setProjectList(newList);
    }
  }, [history]);

  // Since all the sections use basically the same handler functions, I made a reusable class
  const handler = new SectionHandler(current, updateCurrent, history, updateHistory);

  return (
    <div className="mt-8">
      <p className="font-bold text-[1.5rem]">Projects</p>
      <div className="mt-2 w-full">
        <DraggableList
          name="project"
          list={projectList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e)}
          onButtonClick={(e: any) => handler.handleRemoveHistory(e)}
          onItemClick={(e: any) => handler.handleEditPrevious(e)}
          horizontal
        />
      </div>
      <div className="relative z-40 mt-4 w-full">
        <div className="absolute top-2 right-2">
          <CircleButton
            inner={<FontAwesomeIcon icon={faCirclePlus} className="h-full pointer-events-none" />}
            dim={20}
            onClick={handler.handleSubmitCurrent}
          />
        </div>
      </div>
      <ProjectEditor />
    </div>
  );
};
