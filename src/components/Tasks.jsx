import React from "react";
import "../css/TaskContainer.css";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Tasks = ({ content }) => {
  return (
    <Droppable key={content.id} droppableId={content.id}>
      {(provided) => (
        <div className="tasks" 
        style={{ backgroundColor: content.color }} 
        ref={provided.innerRef} 
        {...provided.droppableProps}>
          <div className="title" style={{ color: content.titleColor }}>
            <b>{content.title}</b>
          </div>
          {content.tasks.map((item, index) => {
            return <Task task={item} index={index} key={item.id}/>;
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Tasks;
