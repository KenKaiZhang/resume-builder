import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hook";
import { EditHandler } from "../../../handlers/editHandler";
import { update } from "../../../features/profile/profileSlice";
import { Input } from "../../Input";
import { ListInput } from "../../ListInput";
import { DraggableList } from "../../DraggableList";

export const ProfileEditor = () => {
  // Starts the component with whatever is set to current in initialState
  const current = useAppSelector((state) => state.profile);
  const [linksList, setLinksList] = useState<DragDropList[]>([]);

  // Used for setting the proper <textarea /> height to see everything
  const textAreaAdjust = (e: any) => {
    e.target.style.height = "1px";
    e.target.style.height = 25 + e.target.scrollHeight + "px";
  };

  // Need this for DragDrop formatting
  useEffect(() => {
    if (current.links) {
      const newList = current.links.map((link: string, index: number) => {
        return { id: `${index}`, summary: link };
      });
      setLinksList(newList);
    }
  }, [current.links]);

  useEffect(() => {
    const textArea: HTMLElement = document.getElementById("objective") as HTMLElement;
    if (textArea) {
      textAreaAdjust({ target: textArea });
    }
  }, []);

  const handler = new EditHandler(current, update);

  return (
    <div className="w-full grid grid-rows-auto gap-8">
      <div className="w-full grid grid-cols-3 gap-8">
        <Input id="first" value={current.first ?? ""} placeholder="First Name" onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="middle" value={current.middle ?? ""} placeholder="Middle Name" onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="last" value={current.last ?? ""} placeholder="Last Name" onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div>
        <Input id="address" value={current.address ?? ""} placeholder="Home Address" onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full grid grid-cols-2 gap-8">
        <Input id="phone-number" value={current.phone ?? ""} placeholder="Phone Number" onChange={(e: any) => handler.handleInputChanges(e)} />
        <Input id="email-address" value={current.email ?? ""} placeholder="Email Address" onChange={(e: any) => handler.handleInputChanges(e)} />
      </div>
      <div className="w-full block">
        <ListInput section="user" name="links" onClick={() => handler.handleNewListItem("user", "links")} />
        <DraggableList
          name="links"
          list={linksList ?? []}
          onDragEnd={(e: any) => handler.handleDragDrop(e, "links")}
          onButtonClick={(e: any) => handler.handleRemoveListItem(e, "links")}
          onItemClick={(e: any) => handler.handleEditListItem(e, "user", "links")}
          horizontal
        />
      </div>
      <div className="w-full">
        <textarea
          id="objective"
          name="objective"
          placeholder="Career Objective"
          value={current.objective}
          className="p-4 w-full resize-none border-white-solid rounded-[15px] placeholder:text-white"
          onChange={(e: any) => {
            handler.handleInputChanges(e);
            textAreaAdjust(e);
          }}
        ></textarea>
      </div>
    </div>
  );
};
