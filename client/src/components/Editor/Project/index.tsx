import { useEffect, useState } from "react";
import { EditHandler } from "../../../handlers/editHandler";
import { Input } from "../../Input";
import { ListInput } from "../../ListInput";
import { DraggableList } from "../../DraggableList";
import { useAppSelector } from "../../../app/hook";
import { updateCurrent } from "../../../features/project/projectSlice";

export const ProjectEditor = () => {
  // Starts the component with whatever is set to current in initialState
  const current = useAppSelector((state) => state.project.current);
  const [toolsList, setToolsList] = useState<DragDropList[]>([]);
  const [detailsList, setDetailsList] = useState<DragDropList[]>([]);

  // Need this for DragDrop formatting
  useEffect(() => {
    if (current) {
      if (current.tools) {
        const newList = current.tools?.map((tool: string, index: number) => {
          return { id: `${index}`, summary: tool };
        });
        setToolsList(newList);
      } else {
        setToolsList([]);
      }
      if (current.details) {
        const newList = current.details?.map((detail: string, index: number) => {
          return { id: `${index}`, summary: detail };
        });
        setDetailsList(newList);
      } else {
        setDetailsList([]);
      }
    }
  }, [current]);

  const handler = new EditHandler(current, updateCurrent);

  return (
    <div className="relative p-4 w-full bg-white/25 shadow-sm grid grid-rows-auto gap-8 rounded-[15px]">
      <div className="mt-4 w-full">
        <Input id="name" placeholder="Name" value={current.name ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full block">
        <ListInput section="current" name="tools" onClick={() => handler.handleNewListItem("current", "tools")} />
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
          onItemClick={(e: any) => handler.handleEditListItem(e, "education", "electives")}
        />
      </div>
    </div>
  );
};
