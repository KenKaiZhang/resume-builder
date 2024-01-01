/**
 * The main goal of the SectionHandler is to allow users to edit information
 * on previously "submited" info. They can reorganize the information to an order they want,
 * edit a previous information, remove information, and more. The class takes the Redux
 * state in question for the current and history which represent the currently editing information
 * and a list of previous information respectively (in hind sight probably could just use one Redux state).
 */

import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../app/hook";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export class SectionHandler {
  private current: Education | Experience | Project;
  private updateCurrent: ActionCreatorWithPayload<Education | Experience | Project>;
  private history: Education[] | Experience[] | Project[];
  private updateHistory: ActionCreatorWithPayload<Education[] | Experience[] | Project[]>;

  private dispatch = useAppDispatch();

  constructor(
    current: Education | Experience | Project,
    updateCurrent: ActionCreatorWithPayload<Education | Experience | Project>,
    history: Education[] | Experience[] | Project[],
    updateHistory: ActionCreatorWithPayload<Education[] | Experience[] | Project[]>
  ) {
    this.current = current;
    this.updateCurrent = updateCurrent;
    this.history = history;
    this.updateHistory = updateHistory;
  }

  // Update history
  handleInfoChanges = (updatedHistory: typeof this.history) => {
    this.dispatch(this.updateHistory(updatedHistory));
  };

  // Remove info from the history
  handleRemoveHistory = (e: any) => {
    const infoId: number = Number(e.target.parentNode.id.split("-")[1]);
    if (this.history) {
      const updatedHistory: typeof this.history = [...this.history.slice(0, infoId), ...this.history.slice(infoId + 1)];
      this.dispatch(this.updateHistory(updatedHistory));
    }
  };

  // Set info to current so it can be edited
  handleEditPrevious = (e: any) => {
    const index: number = Number(e.target.parentNode.id.split("-")[1]);
    const targetHistory: typeof this.current = this.history[index];
    this.dispatch(this.updateCurrent(targetHistory));
  };

  // If the current info is new, then add it to the history, otherwise update the old one
  handleSubmitCurrent = () => {
    const updatedHistory: typeof this.history = [...this.history];
    if (this.current.id) {
      const targetIndex: number = this.history.findIndex((info) => info.id === this.current.id);
      if (targetIndex >= 0 && targetIndex < this.history.length) {
        updatedHistory[targetIndex] = this.current;
      } else {
        updatedHistory.push(this.current);
      }
    } else {
      this.dispatch(this.updateCurrent({ id: uuid() }));
      updatedHistory.push(this.current);
    }
    this.dispatch(this.updateHistory(updatedHistory));
    this.dispatch(this.updateCurrent({}));
  };

  // Function that allows DragDrop to work
  handleDragDrop = (res: any) => {
    if (this.history) {
      const { source, destination } = res;
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;

      const reorderedHistory = [...this.history];
      const [removedHistory] = reorderedHistory.splice(source.index, 1);
      reorderedHistory.splice(destination.index, 0, removedHistory);
      this.dispatch(this.updateHistory(reorderedHistory));
    }
  };
}
