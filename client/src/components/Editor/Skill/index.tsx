import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hook";
import { EditHandler } from "../../../handlers/editHandler";
import { update } from "../../../features/skill/skillSlice";
import { ListInput } from "../../ListInput";
import { DraggableList } from "../../DraggableList";

export const SkillEditor = () => {
  const current = useAppSelector((state) => state.skill);
  const [toolsList, setToolsList] = useState<DragDropList[]>([]);
  const [conceptsList, setConceptsList] = useState<DragDropList[]>([]);
  const [servicesList, setServicesList] = useState<DragDropList[]>([]);

  useEffect(() => {
    if (current.tools) {
      const newList = current.tools.map((link: string, index: number) => {
        return { id: `${index}`, summary: link };
      });
      setToolsList(newList);
    }
  }, [current.tools]);

  useEffect(() => {
    if (current.concepts) {
      const newList = current.concepts.map((link: string, index: number) => {
        return { id: `${index}`, summary: link };
      });
      setConceptsList(newList);
    }
  }, [current.concepts]);

  useEffect(() => {
    if (current.services) {
      const newList = current.services.map((link: string, index: number) => {
        return { id: `${index}`, summary: link };
      });
      setServicesList(newList);
    }
  }, [current.services]);

  const handler = new EditHandler(current, update);

  return (
    <div className="w-full grid grid-rows-auto gap-8">
      <div className="w-full block">
        <ListInput section="skill" name="tools" onClick={() => handler.handleNewListItem("skill", "tools")} />
        <DraggableList
          name="tools"
          list={toolsList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e, "tools")}
          onButtonClick={(e: any) => handler.handleRemoveListItem(e, "tools")}
          onItemClick={(e: any) => handler.handleEditListItem(e, "skill", "tools")}
          horizontal
        />
      </div>
      <div className="w-full block">
        <ListInput section="skill" name="concepts" onClick={() => handler.handleNewListItem("skill", "concepts")} />
        <DraggableList
          name="concepts"
          list={conceptsList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e, "concepts")}
          onButtonClick={(e: any) => handler.handleRemoveListItem(e, "concepts")}
          onItemClick={(e: any) => handler.handleEditListItem(e, "skill", "concepts")}
          horizontal
        />
      </div>
      <div className="w-full block">
        <ListInput section="skill" name="services" onClick={() => handler.handleNewListItem("skill", "services")} />
        <DraggableList
          name="services"
          list={servicesList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e, "services")}
          onButtonClick={(e: any) => handler.handleRemoveListItem(e, "services")}
          onItemClick={(e: any) => handler.handleEditListItem(e, "skill", "services")}
          horizontal
        />
      </div>
    </div>
  );
};
