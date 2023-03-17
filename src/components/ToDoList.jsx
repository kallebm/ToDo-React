import React, { Fragment, useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import LoadingSpinner from "./LoadingSpinner";

const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5001/todos");
      const data = await response.json();
      if (response.ok) {
        setTaskList(data);
        setLoading(false);
      }
    };
    loadData();
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="todo-header">
            <h1>React To Do List </h1>
          </div>
          <ToDoForm
            taskList={taskList}
            setTaskList={setTaskList}
            setLoading={setLoading}
          />
          <main className="task-list">
            {taskList.map((task, index) => (
              <ToDoItem
                task={task}
                index={index}
                taskList={taskList}
                setTaskList={setTaskList}
                setLoading={setLoading}
              />
            ))}
          </main>
        </div>
      )}
    </Fragment>
  );
};

export default ToDoList;
