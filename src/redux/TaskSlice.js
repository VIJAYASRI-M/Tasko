import { createSlice } from "@reduxjs/toolkit";
import { listItems } from "../utils/data";

const initialState = listItems;

const TaskSlice= createSlice({
    name:'TaskSlice',
    initialState,
    reducers:{
        moveTask: (state,action)=>{
            const {source,destination}= action.payload;
            const updatedContainer = [...state];
            const sourceColumn = updatedContainer.find(col => col.id === source.droppableId);
            const destinationColumn = updatedContainer.find(col => col.id === destination.droppableId);
            const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
            destinationColumn.tasks.splice(destination.index, 0, movedTask);
            state= updatedContainer;
        }
    }
});

export const {moveTask} = TaskSlice.actions;
export default TaskSlice.reducer;