import React from "react";

const TaskForm = ({taskName,setTaskName,handleAddTask}) => {
  return (
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
  );
};

export default TaskForm;
