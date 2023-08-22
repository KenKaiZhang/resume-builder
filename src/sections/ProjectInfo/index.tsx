// import { useState } from "react";

import { useState, useEffect } from "react";
import { SectionHandler } from "../../handlers/sectionHandler";
import { DraggableList } from "../../components/DraggableList";
import { CircleButton } from "../../components/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ProjectEditor } from "../../components/Editor/Projects";

export interface ProjectInfoProps {
  info: Project[];
  update: any;
}

export const ProjectInfo = (props: ProjectInfoProps) => {
  const { info, update } = props;
  const [current, setCurrent] = useState<Project>({});
  const [projectList, setProjectList] = useState<DragDropList[]>([]);

  useEffect(() => {
    if (info) {
      const newList = info.map((project: Project) => {
        return { id: project.id, summary: project.name };
      });
      setProjectList(newList);
    }
  }, [info]);

  const handler = new SectionHandler(info, update, current, setCurrent);

  return (
    <div className="mt-8">
      <p className="font-bold">Projects</p>
      <div className="mt-4 w-full">
        <DraggableList
          name="project"
          list={projectList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e)}
          onButtonClick={(e: any) => handler.handleRemoveInfo(e)}
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
      <ProjectEditor info={current} update={handler.handleCurrentChanges} />
    </div>
  );
};
