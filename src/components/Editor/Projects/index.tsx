import { useEffect, useState } from "react";
import { EditHandler } from "../../../handlers/editHandler";
import { Input } from "../../Input";
import { ListInput } from "../../ListInput";
import { DraggableList } from "../../DraggableList";

export interface ProjectEditorProps {
  info: Project;
  update: any;
}

export const ProjectEditor = (props: ProjectEditorProps) => {
  const { info: project, update } = props;
  const [toolsList, setToolsList] = useState<DragDropList[]>([]);
  const [detailsList, setDetailsList] = useState<DragDropList[]>([]);

  useEffect(() => {
    if (project) {
      if (project.tools) {
        const newList = project.tools?.map((tool: string, index: number) => {
          return { id: `${index}`, summary: tool };
        });
        setToolsList(newList);
      } else {
        setToolsList([]);
      }
      if (project.details) {
        const newList = project.details?.map((detail: string, index: number) => {
          return { id: `${index}`, summary: detail };
        });
        setDetailsList(newList);
      } else {
        setDetailsList([]);
      }
    }
  }, [project]);

  const handler = new EditHandler(project, update);

  return (
    <div className="relative p-4 w-full bg-white/25 shadow-md grid grid-rows-auto gap-8 rounded-[15px]">
      <div className="mt-4 w-full">
        <Input id="name" placeholder="Name" value={project.name ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full block">
        <ListInput section="project" name="tools" onClick={() => handler.handleNewListItem("project", "tools")} />
        <DraggableList
          name="tools"
          list={toolsList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e, "tools")}
          onButtonClick={(e: any) => handler.handleRemoveListItem(e, "tools")}
          horizontal
        />
      </div>
      <div className="w-full block">
        <ListInput section="project" name="details" onClick={() => handler.handleNewListItem("project", "details")} />
        <DraggableList
          name="details"
          list={detailsList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e, "details")}
          onButtonClick={(e: any) => handler.handleRemoveListItem(e, "details")}
        />
      </div>
    </div>
  );
};
