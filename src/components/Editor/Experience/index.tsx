import { useState, useEffect } from "react";
import { EditHandler } from "../../../handlers/editHandler";
import { DraggableList } from "../../DraggableList";
import { Input } from "../../Input";
import { ListInput } from "../../ListInput";

export interface ExperienceEditorProps {
  info: Experience;
  update: any;
}

export const ExperienceEditor = (props: ExperienceEditorProps) => {
  const { info: experience, update } = props;
  const [detailsList, setDetailsList] = useState<DragDropList[]>([]);
  useEffect(() => {
    console.log("INFO: ", experience.details);
    if (experience && experience.details) {
      const newList = experience.details?.map((elective: string, index: number) => {
        return { id: `${index}`, summary: elective };
      });
      setDetailsList(newList);
    } else {
      setDetailsList([]);
    }
  }, [experience]);

  const handler = new EditHandler(experience, update);

  return (
    <div className="relative p-4 w-full border-white-solid grid grid-rows-auto gap-8 rounded-[15px]">
      <div className="mt-4 w-full grid grid-cols-2 gap-8">
        <Input id="position" placeholder="Position" value={experience.position ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="company" placeholder="Company" value={experience.company ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="mt-4 w-full grid grid-cols-3 gap-8">
        <Input id="city" placeholder="City" value={experience.city ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="state" placeholder="State" value={experience.state ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="country" placeholder="Country" value={experience.country ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="mt-4 w-full grid grid-cols-2 gap-8">
        <Input id="start" placeholder="Start" value={experience.start ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="end" placeholder="End" value={experience.end ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full block">
        <ListInput section="experience" name="details" onClick={() => handler.handleNewListItem("experience", "details")} />
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
