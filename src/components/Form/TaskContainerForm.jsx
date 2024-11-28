import React from 'react'

const TaskContainerForm = ({taskContainer,handleChange,handleAddTaskContainer}) => {
  return (
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

export default TaskContainerForm