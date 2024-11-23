import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/TaskSlice";

const Task = ({ task, index,columnId }) => {
  const dispatch =useDispatch();
  const handleDelete =()=>{
    dispatch(removeTask({columnId,taskId:task.id}))
  }
  if (task) {
    return (
      <Draggable
        key={task.id}
        draggableId={("" + task.id).toString()}
        index={index}
      >
        {(provided) => (
          <div
            className="Task"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task && (
              <>
                <div className="name">{task.name}</div>
                <div className="user"></div>
                <div className="priority">
                  <FaEdit size={20}/>
                  <RiDeleteBin5Fill size={20} onClick={handleDelete}/>
                </div>
              </>
            )}
          </div>
        )}
      </Draggable>
    );
  }
};

export default Task;
