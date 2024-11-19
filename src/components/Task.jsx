import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  if (task) console.log(index, task.name);

  if (task) {
    return (
      <Draggable draggableId={("" + task.id).toString()} index={index}>
        {(provided) => (
          <div
            className="Task"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task && task.name}
          </div>
        )}
      </Draggable>
    );
  }
};

export default Task;
