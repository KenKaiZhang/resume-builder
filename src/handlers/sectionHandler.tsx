import { v4 as uuid } from "uuid";

export class SectionHandler {
  private info: Education[] | Experience[] | Project[];
  private updateInfo: any;
  private current: Education | Experience | Project;
  private updateCurrent: any;

  constructor(info: Education[] | Experience[], updateInfo: any, current: Education | Experience, updateCurrent: any) {
    this.info = info;
    this.updateInfo = updateInfo;
    this.current = current;
    this.updateCurrent = updateCurrent;
  }

  handleInfoChanges = (updatedInfo: typeof this.info) => {
    this.updateInfo(updatedInfo);
  };

  handleCurrentChanges = (key: string, value: any) => {
    console.log(key, value);
    this.updateCurrent((prevInfo: typeof this.info) => ({ ...prevInfo, [key]: value }));
  };

  handleRemoveInfo = (e: any) => {
    const infoId: number = Number(e.target.parentNode.id.split("-")[1]);
    if (this.info) {
      const updatedInfo: typeof this.info = [...this.info.slice(0, infoId), ...this.info.slice(infoId + 1)];
      this.updateInfo(updatedInfo);
    }
  };

  handleEditPrevious = (e: any) => {
    const index: number = Number(e.target.parentNode.id.split("-")[1]);
    const targetInfo: typeof this.current = this.info[index];
    this.updateCurrent(targetInfo);
  };

  handleSubmitCurrent = () => {
    const updatedInfo: typeof this.info = [...this.info];
    if (this.current.id) {
      const targetIndex: number = this.info.findIndex((info) => info.id === this.current.id);
      if (targetIndex >= 0 && targetIndex < this.info.length) {
        updatedInfo[targetIndex] = this.current;
      } else {
        updatedInfo.push(this.current);
      }
    } else {
      this.current.id = uuid();
      updatedInfo.push(this.current);
    }
    this.updateInfo(updatedInfo);
    this.updateCurrent({});
  };

  handleDragDrop = (res: any) => {
    if (this.info) {
      const { source, destination } = res;
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index == destination.index) return;

      const reorderedList = [...this.info];
      const [removedList] = reorderedList.splice(source.index, 1);
      reorderedList.splice(destination.index, 0, removedList);
      return this.updateInfo(reorderedList);
    }
  };
}
