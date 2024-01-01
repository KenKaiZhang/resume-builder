import { useState, useEffect } from "react";
import { EditHandler } from "../../../handlers/editHandler";
import { DraggableList } from "../../DraggableList";
import { Input } from "../../Input";
import { ListInput } from "../../ListInput";
import { useAppSelector } from "../../../app/hook";
import { updateCurrent } from "../../../features/experience/experienceSlice";

export const ExperienceEditor = () => {
  // Starts the component with whatever is set to current in initialState
  const current = useAppSelector((state) => state.experience.current);
  const [detailsList, setDetailsList] = useState<DragDropList[]>([]);

  // Need this for DragDrop formatting
  useEffect(() => {
    if (current && current.details) {
      const newList = current.details?.map((elective: string, index: number) => {
        return { id: `${index}`, summary: elective };
      });
      setDetailsList(newList);
    } else {
      setDetailsList([]);
    }
  }, [current]);

  const handler = new EditHandler(current, updateCurrent);

  return (
    <div className="relative p-4 max-w-full bg-white/25 shadow-sm  grid grid-rows-auto gap-8 rounded-[15px]">
      <div className="mt-4 w-full grid grid-cols-2 gap-8">
        <Input id="position" placeholder="Position" value={current.position ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="company" placeholder="Company" value={current.company ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="mt-4 w-full grid grid-cols-3 gap-8">
        <Input id="city" placeholder="City" value={current.city ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="state" placeholder="State" value={current.state ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="country" placeholder="Country" value={current.country ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="mt-4 w-full grid grid-cols-2 gap-8">
        <Input id="start" placeholder="Start" value={current.start ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="end" placeholder="End" value={current.end ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full block">
        <ListInput section="experience" name="details" onClick={() => handler.handleNewListItem("experience", "details")} />
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
