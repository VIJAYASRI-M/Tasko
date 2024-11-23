import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  if (task) {
    return (
      <Draggable key={task.id} draggableId={("" + task.id).toString()} index={index}>
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
