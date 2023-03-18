import React, { useState } from "react";
import { ReactComponent as Loader } from "./assets/spinner.svg";

const ToDoForm = ({ taskList, setTaskList }) => {
  const [title, setTitle] = useState("");
  const [isLoadingAdd, setLoadingAdd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      return;
    }
    const taskData = {
      id: Math.random(),
      title: title,
      done: false,
    };
    setLoadingAdd(true);
    const response = await fetch("http://localhost:5001/todos", {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      setLoadingAdd(false);
      setTaskList([...taskList, taskData]);
      setTitle("");
    }
  };

  return (
    <div className="todo-form">
      <h2>Digite suas tarefas</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="taskInput">Tarefa a ser realizada: </label>
          <input
            type="text"
            name="task"
            id="taskInput"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <button type="submit" disabled={isLoadingAdd}>
          {isLoadingAdd ? <Loader className="spinner" /> : "Adicionar tarefa"}
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
