import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ListItem } from "../ListItem";

export interface DraggableListProps {
  name: string;
  list: DragDropList[];
  horizontal?: boolean;
  onDragEnd: any;
  onItemClick?: any;
  onButtonClick: any;
}

export const DraggableList = (props: DraggableListProps) => {
  const { name, list, horizontal, onDragEnd, onItemClick, onButtonClick } = props;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`${name}-drop-root`} direction={horizontal ? "horizontal" : "vertical"}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="w-full flex gap-4 flex-wrap">
            {list.map((item, i) => {
              const { id = "", summary = "" } = item;
              return (
                <Draggable key={i} draggableId={`drag-${name}-${i}`} index={i}>
                  {(provided) => (
                    <div key={i} id={id} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                      <ListItem id={`${name}-${i}`} name={summary} onButtonClick={onButtonClick} onItemClick={onItemClick} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
