import { createSlice } from "@reduxjs/toolkit";
import { listItems } from "../utils/data";

const initialState = listItems;

const TaskSlice = createSlice({
  name: "TaskSlice",
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { source, destination } = action.payload;
      const updatedContainer = [...state];
      const sourceColumn = updatedContainer.find(
        (col) => col.id === source.droppableId
      );
      const destinationColumn = updatedContainer.find(
        (col) => col.id === destination.droppableId
      );
      const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
      destinationColumn.tasks.splice(destination.index, 0, movedTask);
      state = updatedContainer;
    },
    addTask: (state, action) => {
      const { columnId, task } = action.payload; // Extract columnId and task from the action payload
      const columnIndex = state.findIndex((col) => col.id === columnId); // Find the index of the column

      if (columnIndex !== -1) {
        const updatedTasks = [...state[columnIndex].tasks, task];
        const updatedColumn = {
          ...state[columnIndex],
          tasks: updatedTasks,
        };
        return [
          ...state.slice(0, columnIndex),
          updatedColumn,
          ...state.slice(columnIndex + 1),
        ];
      }
      return state;
    },
    removeTask: (state, action) => {
      const { columnId, taskId } = action.payload; // Extract columnId and taskId from the action payload
      const columnIndex = state.findIndex((col) => col.id === columnId); // Find the index of the column

      if (columnIndex !== -1) {
        // Filter out the task that matches the taskId
        const updatedTasks = state[columnIndex].tasks.filter(
          (task) => task.id !== taskId
        );

        // Create a new column object with the updated tasks
        const updatedColumn = {
          ...state[columnIndex],
          tasks: updatedTasks,
        };

        // Create a new state array with the updated column
        return [
          ...state.slice(0, columnIndex),
          updatedColumn,
          ...state.slice(columnIndex + 1),
        ];
      }

      return state; // Return the current state if the column is not found
    },
    addTaskContainer: (state, action)=>{
        const {newContainer} = action.payload;
        state = [...state,newContainer];
        return state;
    }
  },
});

export const { moveTask, addTask, removeTask,addTaskContainer } = TaskSlice.actions;
export default TaskSlice.reducer;
