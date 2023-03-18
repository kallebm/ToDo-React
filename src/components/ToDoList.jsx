import React, { Fragment, useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:5001/todos");
      const data = await response.json();
      if (response.ok) {
        setTaskList(data);
      }
    };
    loadData();
  }, []);
  return (
    <Fragment>
      <div>
        <div className="todo-header">
          <h1>React To Do List </h1>
        </div>
        <ToDoForm taskList={taskList} setTaskList={setTaskList} />
        <main className="task-list">
          {taskList.map((task, index) => (
            <ToDoItem
              key={index}
              task={task}
              index={index}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          ))}
        </main>
      </div>
    </Fragment>
  );
};

export default ToDoList;
