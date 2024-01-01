import { useEffect, useState } from "react";
import { EditHandler } from "../../../handlers/editHandler";
import { DraggableList } from "../../DraggableList";
import { Input } from "../../Input";
import { ListInput } from "../../ListInput";
import { useAppSelector } from "../../../app/hook";
import { updateCurrent } from "../../../features/education/educationSlice";

export const EducationEditor = () => {
  // Starts the component with whatever is set to current in initialState
  const current: Education = useAppSelector((state) => state.education.current);
  const [electivesList, setElectivesList] = useState<DragDropList[]>([]);

  // Need this for DragDrop formatting
  useEffect(() => {
    if (current && current.electives) {
      const newList = current.electives?.map((elective: string, index: number) => {
        return { id: `${index}`, summary: elective };
      });
      setElectivesList(newList);
    } else {
      setElectivesList([]);
    }
  }, [current]);

  const handler = new EditHandler(current, updateCurrent);

  return (
    <div className="relative p-4 w-full bg-white/25 shadow-sm grid grid-rows-auto gap-8 rounded-[15px]">
      <div className="mt-4 w-full">
        <Input id="school" placeholder="School" value={current.school ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full grid grid-cols-3 gap-8">
        <Input id="city" placeholder="City" value={current.city ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="state" placeholder="State" value={current.state ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="country" placeholder="Country" value={current.country ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full grid grid-cols-3 gap-8">
        <Input id="degree" placeholder="Degree" value={current.degree ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="major" placeholder="Major" value={current.major ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="gpa" placeholder="GPA" value={current.gpa ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full grid grid-cols-3 gap-8">
        <Input id="start" placeholder="Start" value={current.start ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="end" placeholder="End" value={current.end ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <div className="flex gap-4">
          <label className="h-[25px] w-[25px] center bg-white/50 rounded-[5px] cursor-pointer">
            <input
              id="graduated"
              type="checkbox"
              className="peer"
              checked={current.graduated}
              hidden
              onChange={(e: any) => handler.handleInputChanges(e)}
            />
            <div className="absolute invisible h-[15px] w-[15px] bg-blue-400 rounded-[10px] border-white-solid peer-checked:visible" />
          </label>
          <p>Graduated</p>
        </div>
      </div>
      <div className="w-full block">
        <ListInput section="education" name="electives" onClick={() => handler.handleNewListItem("education", "electives")} />
        <DraggableList
          name="electives"
          list={electivesList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e, "electives")}
          onButtonClick={(e: any) => handler.handleRemoveListItem(e, "electives")}
          onItemClick={(e: any) => handler.handleEditListItem(e, "education", "electives")}
        />
      </div>
    </div>
  );
};
