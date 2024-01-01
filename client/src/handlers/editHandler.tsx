/**
 * The EditHandler class's main focus is to provide commonly use functions that allow users to
 * add and edit information of a either one of the 5 information desired for a proper resume.
 * The current state will be the Redux state in question and updateCurrent will be the action
 * that is required to update the state through dispatch
 */

import { useAppDispatch } from "../app/hook";

export class EditHandler {
  private current: Profile | Education | Experience | Project;
  private updateCurrent: any;

  // Need this to initiate a dispatch that will send an action to store to update a state
  private dispatch = useAppDispatch();

  constructor(current: Profile | Education | Experience | Project, updateCurrent: any) {
    this.current = current;
    this.updateCurrent = updateCurrent;
  }

  // Updates the current info being worked on
  handleInputChanges = (e: any) => {
    const key: string = e.target.id;
    let value: string | boolean = key === "graduated" ? e.target.checked : e.target.value;
    this.dispatch(this.updateCurrent({ [key]: value }));
  };

  // Adds a new item to the list or save change (edit determined by data-edit attribute)
  handleNewListItem = (section: string, name: string) => {
    const inputDOM = document.querySelector(`#new-${section}-${name}`) as HTMLInputElement;
    const newItem: string = inputDOM.value;
    const dataEdit: number = Number(inputDOM.getAttribute("data-edit"));
    const updatedList: string[] = [...(this.current[name as keyof typeof this.current] ?? [])];

    if (dataEdit === -1) {
      updatedList.push(newItem);
    } else {
      updatedList[dataEdit] = newItem;
    }
    inputDOM.setAttribute("data-edit", "-1");
    inputDOM.value = "";
    this.dispatch(this.updateCurrent({ [name]: updatedList }));
  };

  // Allows edit for older items
  handleEditListItem = (e: any, section: string, name: string) => {
    const itemId: number = Number(e.target.parentNode.id.split("-")[1]);
    const inputDOM: HTMLInputElement = document.querySelector(`#new-${section}-${name}`) as HTMLInputElement;
    const targetItem = this.current[name as keyof typeof this.current]![itemId];

    // Set the value and which index the value came from
    inputDOM.setAttribute("data-edit", String(itemId));
    inputDOM.value = targetItem;
  };

  // Removes item from the list
  handleRemoveListItem = (e: any, name: string) => {
    const itemId: number = Number(e.target.parentNode.id.split("-")[1]);
    if (this.current[name as keyof typeof this.current]) {
      const prevList: any = this.current[name as keyof typeof this.current] ?? [];
      const updatedList: string[] = [...prevList.slice(0, itemId), ...prevList.slice(itemId + 1)];
      this.dispatch(this.updateCurrent({ [name]: updatedList }));
    }
  };

  // Used to let DragDrop work
  handleDragDrop = (res: any, name: string) => {
    if (this.current && this.current[name as keyof typeof this.current]) {
      const { source, destination } = res;
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;

      const reorderedList: any = [...(this.current[name as keyof typeof this.current] ?? [])];
      const [removedList] = reorderedList.splice(source.index, 1);
      reorderedList.splice(destination.index, 0, removedList);
      return this.dispatch(this.updateCurrent({ [name]: reorderedList }));
    }
  };
}
