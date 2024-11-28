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
import TaskContainerForm from "./Form/TaskContainerForm";
import TaskForm from "./Form/TaskForm";

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

  const generateUId = ()=> uuid.slice(0,8);

  const handleAddTask = () => {
    const task = {
      id: generateUId,
      name: taskName,
    };
    dispatch(addTask({ columnId: content.id, task }));
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
    const newContainer = {
      id: generateUId(),
      title: taskContainer.title,
      color: taskContainer.color,
      tasks: taskContainer.tasks,
    };
    dispatch(addTaskContainer({ newContainer }));
    setTaskContainer(initialTaskContainer);
    setOpen(false);
  };

  const taskColor = darkenColor(content.color, 45);

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

            <div className="title" style={{ color: taskColor }}>
              <div className="count" style={{ color: taskColor }}>
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
                backgroundColor: `${taskColor}32`,
                borderColor: taskColor,
                color: taskColor,
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
          type==='Task' ? (
            <TaskForm
            taskName={taskName}
            setTaskName={setTaskName}
            handleAddTask={handleAddTask}
            />
          ):(
            <TaskContainerForm
            taskContainer={taskContainer}
            handleAddTaskContainer={handleAddTaskContainer}
            handleChange={handleChange}
            />
          )
        }
      </Modal>
    </>
  );
};

export default Tasks;
