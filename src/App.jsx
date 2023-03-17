import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <div className="App">
      <ToDoList />
    </div>
  );
}

export default App;
