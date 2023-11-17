import { useEffect, useState } from "react";
import { EditHandler } from "../../../handlers/editHandler";
import { DraggableList } from "../../DraggableList";
import { Input } from "../../Input";
import { ListInput } from "../../ListInput";

export interface EducationEditorProps {
  info: Education;
  update: any;
}

export const EducationEditor = (props: EducationEditorProps) => {
  const { info: education, update } = props;
  const [electivesList, setElectivesList] = useState<DragDropList[]>([]);

  useEffect(() => {
    console.log("INFO: ", education.electives);
    if (education && education.electives) {
      const newList = education.electives?.map((elective: string, index: number) => {
        return { id: `${index}`, summary: elective };
      });
      setElectivesList(newList);
    } else {
      setElectivesList([]);
    }
  }, [education]);

  const handler = new EditHandler(education, update);

  return (
    <div className="relative p-4 w-full bg-white/25 shadow-md grid grid-rows-auto gap-8 rounded-[15px]">
      <div className="mt-4 w-full">
        <Input id="school" placeholder="School" value={education.school ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full grid grid-cols-3 gap-8">
        <Input id="city" placeholder="City" value={education.city ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="state" placeholder="State" value={education.state ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="country" placeholder="Country" value={education.country ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full grid grid-cols-2 gap-8">
        <Input id="degree" placeholder="Degree" value={education.degree ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="major" placeholder="Major" value={education.major ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full grid grid-cols-3 gap-8">
        <Input id="start" placeholder="Start" value={education.start ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="end" placeholder="End" value={education.end ?? ""} onChange={(e: any) => handler.handleInputChanges(e)} />
        <div className="flex gap-4">
          <label className="h-[25px] w-[25px] center bg-white/50 rounded-[5px] cursor-pointer">
            <input id="graduated" type="checkbox" className="peer" hidden />
            <div className="absolute invisible h-[15px] w-[15px] bg-blue-400 rounded-[5px] border-white-solid peer-checked:visible" />
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
          horizontal
        />
      </div>
    </div>
  );
};
