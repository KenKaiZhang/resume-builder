import { getInputValue } from "../utils/getInputValue";

export class EditHandler {
  private info: Education | Experience | Project;
  private update: (key: string, value: any) => void;

  constructor(info: Education | Experience | Project, update: any) {
    this.info = info;
    this.update = update;
  }

  handleInputChanges = (e: any) => {
    const id: string = e.target.id;
    const value: string = e.target.value;
    this.update(id, value);
  };

  handleNewListItem = (section: string, name: string) => {
    const newItem: string = getInputValue(`new-${section}-${name}`);
    console.log(newItem);
    const updatedList: any = this.info[name as keyof typeof this.info] ?? [];

    updatedList.push(newItem);
    this.update(name, updatedList);
  };

  handleRemoveListItem = (e: any, name: string) => {
    console.log("REMOVE ITEM: ", e.currentTarget.parentNode);
    const itemId: number = Number(e.target.parentNode.id.split("-")[1]);
    console.log(itemId);
    if (this.info?.[name as keyof typeof this.info]) {
      const prevList: any = this.info[name as keyof typeof this.info] ?? [];
      const updatedList = [...prevList.slice(0, itemId), ...prevList.slice(itemId + 1)];
      this.update(name, updatedList);
    }
  };

  handleDragDrop = (res: any, name: string) => {
    if (this.info && this.info[name as keyof typeof this.info]) {
      const { source, destination } = res;
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;

      const reorderedList: any = this.info[name as keyof typeof this.info] ?? [];
      const [removedList] = reorderedList.splice(source.index, 1);
      reorderedList.splice(destination.index, 0, removedList);
      console.log(name);
      return this.update(name, reorderedList);
    }
  };
}
