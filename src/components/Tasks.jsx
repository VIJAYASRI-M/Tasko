import React, { useState } from "react";
import "../css/TaskContainer.css";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTask, addTaskContainer } from "../redux/TaskSlice";
import Modal from "./Modal";
import { v4 as uuid } from "uuid";
import { darkenColor } from "../utils/color";

const Tasks = ({ content }) => {
  const initialTaskContainer= {
    id:'',
    title:'',
    color:'',
    tasks:[],
  }
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState();
  const [taskContainer,setTaskContainer] =useState(initialTaskContainer);
  const [type,setType]= useState('');
  const dispatch = useDispatch();
  const handleAddTask = () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
    const task = {
      id: small_id,
      name: taskName,
    };
    const columnId = content.id;
    dispatch(addTask({ columnId, task }));
    setTaskName("");
    setOpen(false);
  };
  const handleChange=(evt)=> {
    const {name,value} = evt.target;
    setTaskContainer({
      ...taskContainer,
      [name]: value
    });
  }
  const handleAddTaskContainer = (e) => {
    e.preventDefault();
    const unique_id = uuid();
    const newContainer = {
      id: unique_id.slice(0, 8),
      title: taskContainer.title,
      color: taskContainer.color,
      tasks: taskContainer.tasks,
    };
    dispatch(addTaskContainer({ newContainer }));
    setTaskContainer(initialTaskContainer);
    setOpen(false);
  };
  return (
    <>
      <Droppable key={content.id} droppableId={content.id}>
        {(provided) => (
          <div
            className="tasks"
            style={{ backgroundColor: content.color }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="title" style={{ color: darkenColor(content.color,45) }}>
              <div className="count" style={{ color: darkenColor(content.color,45) }}>
                <b>{content.tasks.length}</b>
              </div>
              <b>{content.title}</b>
              <FaPlus onClick={()=>{
                setType('TaskContainer')
                setOpen(true)
                }} />
            </div>
            {content.tasks.map((item, index) => {
              return (
                <Task
                  task={item}
                  index={index}
                  key={item.id}
                  columnId={content.id}
                />
              );
            })}

            {provided.placeholder}
            <div
              className="addTask"
              style={{
                backgroundColor: `${darkenColor(content.color,45)}32`,
                borderColor: darkenColor(content.color,45),
                color: darkenColor(content.color,45),
              }}
              onClick={() => {
                setType('Task')
                setOpen(true)}
              }
            >
              <b>Add Item</b>
            </div>
          </div>
        )}
      </Droppable>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        {
          type==='Task' && (
            <>
            <h3>Add a Task</h3>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                name="TaskName"
                placeholder="Enter a task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="input"
              />
            </form>
            </>
          )
        }
        {
          type==='TaskContainer' && (
            <>
            <h3>Add a section</h3>
            <form onSubmit={handleAddTaskContainer}> 
            <input
                type="text"
                name="title"
                placeholder="Enter a Title"
                value={taskContainer.title}
                onChange={handleChange}
                className="input"
              />
              <input
                type="color"
                name="color"
                className="color-input"
                placeholder="Enter a Title"
                value={taskContainer.color}
                onChange={handleChange}
              />
            </form>
            </>
          )
        }
      </Modal>
    </>
  );
};

export default Tasks;
