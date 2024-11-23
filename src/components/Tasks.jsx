import React from "react";
import "../css/TaskContainer.css";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTask, addTaskContainer } from "../redux/TaskSlice";

const Tasks = ({ content, modal }) => {
  const dispatch =useDispatch();
  const handleAddTask = ()=>{
    const task={
      id:'1234',
      name: 'task123'
    };
    const columnId=content.id;
    dispatch(addTask({columnId,task}));
    modal();
  }
  const handleAddTaskContainer =()=>{
    const newContainer = {
      id:"InProgress 1",
      title:"In Progress",
      color:"#FFE699",
      titleColor:'#b0933b',
      tasks:[
        {
            id:'t13 inprog',
            name:'task1'
        }
      ]
    };
    dispatch(addTaskContainer({newContainer}));
  }
  return (
    <Droppable key={content.id} droppableId={content.id}>
      {(provided) => (
        <div
          className="tasks"
          style={{ backgroundColor: content.color }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="title" style={{ color: content.titleColor }}>
            <div className="count" style={{ color: content.titleColor }}>
              <b>{content.tasks.length}</b>
            </div>
            <b>{content.title}</b>
            <FaPlus onClick={handleAddTaskContainer}/>
          </div>
          {content.tasks.map((item, index) => {
            return <Task task={item} index={index} key={item.id} columnId={content.id} />;
          })}

          {provided.placeholder}
          <div
            className="addTask"
            style={{
              backgroundColor: `${content.titleColor}32`,
              borderColor: content.titleColor,
              color: content.titleColor,
            }}
            onClick={handleAddTask}
          >
            <b>Add Item</b>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Tasks;
