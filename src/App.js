import "./css/App.css";
import Header from "./components/Header";
import Topbar from "./components/Topbar";
import Tasks from "./components/Tasks";
import Task from "./components/Task";
import { useState } from "react";
import { listItems } from "./utils/data";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [taskContainer, setTaskContainer] = useState(listItems);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    const updatedContainer = [...taskContainer];
    const sourceColumn = updatedContainer.find(col => col.id === source.droppableId);
    const destinationColumn = updatedContainer.find(col => col.id === destination.droppableId);
    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
    destinationColumn.tasks.splice(destination.index, 0, movedTask);
    setTaskContainer(updatedContainer);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {/* <Header/>
        <Topbar/> */}
        <div className="TaskContainer">
          {taskContainer.map((item, index) => {
            return <Tasks content={item} key={index} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
