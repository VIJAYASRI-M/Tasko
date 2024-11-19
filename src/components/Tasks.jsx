import React from "react";
import "../css/TaskContainer.css";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Tasks = ({ content }) => {
  return (
    <Droppable droppableId={content.id}>
      {(provided) => (
        <div className="tasks" style={{ backgroundColor: content.color }} ref={provided.innerRef} {...provided.droppableProps}>
          <div className="title" style={{ color: content.titleColor }}>
            <b>{content.title}</b>
          </div>
          {
            console.log(content.title)
          }
          {content.tasks.map((item, index) => {
            return <Task task={item} index={index} key={index}/>;
          })}
          <Task />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Tasks;
