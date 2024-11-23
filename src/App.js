import "./css/App.css";
import Header from "./components/Header";
import Topbar from "./components/Topbar";
import Tasks from "./components/Tasks";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { moveTask } from "./redux/TaskSlice";
import Modal from "./components/Modal";
import { useState } from "react";

function App() {

  const dispatch = useDispatch();
  const taskContainer = useSelector((state) => state.tasks);
  const [open,setOpen] = useState(false);
  const handleOpen = ()=>{
    setOpen(true);
  }
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    dispatch(moveTask({ source, destination }));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {/* <Header/>
        <Topbar/> */}
        <div className="TaskContainer">
          {taskContainer.map((item, index) => {
            return <Tasks content={item} key={item.id} modal={handleOpen}/>;
          })}
        </div>
        <Modal isOpen={open} closeModal={()=>setOpen(false)}>
          <>
            <p>helloooo</p>
          </>
        </Modal>
      </div>
    </DragDropContext>
  );
}

export default App;
