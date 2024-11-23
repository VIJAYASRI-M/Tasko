import "./css/App.css";
import Header from "./components/Header";
import Topbar from "./components/Topbar";
import Tasks from "./components/Tasks";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { moveTask } from "./redux/TaskSlice";

function App() {
  const dispatch =useDispatch();
  const taskContainer =useSelector((state)=> state.tasks);
  console.log(taskContainer)
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    dispatch(moveTask({source,destination}));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {/* <Header/>
        <Topbar/> */}
        <div className="TaskContainer">
          {taskContainer.map((item, index) => {
            return <Tasks content={item} key={item.id} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
