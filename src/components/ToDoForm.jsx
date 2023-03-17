import React, { useState } from "react";

const ToDoForm = ({ taskList, setTaskList, setLoading }) => {
  const [title, setTitle] = useState("");

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
    setLoading(true);
    const response = await fetch("http://localhost:5001/todos", {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      setLoading(false);
      setTaskList([...taskList, taskData]);
    }
  };

  const handleChange = (e) => {
    setTitle(e.currentTarget.value);
    console.log(taskList);
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
            onChange={handleChange}
          />
        </div>
        <button type="submit">Adicionar tarefa</button>
      </form>
    </div>
  );
};

export default ToDoForm;
