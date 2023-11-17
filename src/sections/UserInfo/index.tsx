import { Input } from "../../components/Input";
import { ListInput } from "../../components/ListInput";
import { DraggableList } from "../../components/DraggableList";
import { getInputValue } from "../../utils/getInputValue";
import { useEffect, useState } from "react";

export interface UserInfoProps {
  info: User;
  update: any;
}

export const UserInfo = (props: UserInfoProps) => {
  const { info, update } = props;
  const [linksList, setLinksList] = useState<DragDropList[]>([]);

  useEffect(() => {
    if (info.links) {
      const newList = info.links.map((link: string, index: number) => {
        return { id: `${index}`, summary: link };
      });
      setLinksList(newList);
    }
  }, [info.links]);

  useEffect(() => {
    const textArea: HTMLElement = document.getElementById("objective-area") as HTMLElement;
    if (textArea) {
      textAreaAdjust({ target: textArea });
    }
  }, []);

  const handleChange = (e: any) => {
    const key: string = e.target.id.split("-")[0];
    const value: string = e.target.value;

    update(key, value);
  };

  const handleNewLink = (e: any) => {
    const newLink: string = getInputValue("new-user-links");
    if (info.links) {
      const updatedLinks = [...info.links, newLink];
      update("links", updatedLinks);
    }
  };

  const handleRemoveLink = (e: any) => {
    const linkId: number = Number(e.target.parentNode.id.split("-")[1]);
    if (info.links) {
      const updatedLinks = [...info.links.slice(0, linkId), ...info.links.slice(linkId + 1)];
      update("links", updatedLinks);
    }
  };

  const handleDragDrop = (res: any) => {
    if (info.links) {
      const { source, destination } = res;
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;

      const reorderedLinks = [...info.links];
      const [removedLinks] = reorderedLinks.splice(source.index, 1);
      reorderedLinks.splice(destination.index, 0, removedLinks);
      return update("links", reorderedLinks);
    }
  };

  const textAreaAdjust = (e: any) => {
    e.target.style.height = "1px";
    e.target.style.height = 25 + e.target.scrollHeight + "px";
  };

  return (
    <div className="w-full grid grid-rows-auto gap-8">
      <div className="w-full grid grid-cols-3 gap-8">
        <Input id="first-name" value={info.first ?? ""} placeholder="First Name" onChange={handleChange} />
        <Input id="middle-name" value={info.middle ?? ""} placeholder="Middle Name" onChange={handleChange} />
        <Input id="last-name" value={info.last ?? ""} placeholder="Last Name" onChange={handleChange} />
      </div>
      <div>
        <Input id="address" value={info.address ?? ""} placeholder="Home Address" onChange={handleChange} />
      </div>
      <div className="w-full grid grid-cols-2 gap-8">
        <Input id="phone-number" value={info.phone ?? ""} placeholder="Phone Number" onChange={handleChange} />
        <Input id="email-address" value={info.email ?? ""} placeholder="Email Address" onChange={handleChange} />
      </div>
      <div className="w-full block">
        <ListInput section="user" name="links" onClick={handleNewLink} />
        <DraggableList name="links" list={linksList ?? []} onDragEnd={handleDragDrop} onButtonClick={handleRemoveLink} horizontal />
      </div>
      <div className="w-full">
        <textarea
          id="objective-area"
          name="objective"
          placeholder="Career Objective"
          value={info.objective}
          className="p-4 w-full resize-none border-white-solid rounded-[15px] placeholder:text-white"
          onChange={(e: any) => {
            handleChange(e);
            textAreaAdjust(e);
          }}
        ></textarea>
      </div>
    </div>
  );
};
