import React, { Fragment, useState } from "react";
import Modal from "./Modal";

const ToDoItem = ({ task, index, taskList, setTaskList, setLoading }) => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:5001/todos/${task.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTaskList((prevTaskList) =>
        prevTaskList.filter((t) => t.id !== task.id)
      );
      setLoading(false);
    } else {
      new Error();
    }
  };

  const handleChecked = async () => {
    const uptadedTask = { ...task, done: !task.done };
    setLoading(true);
    const response = await fetch(`http://localhost:5001/todos/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uptadedTask),
    });

    if (response.ok) {
      const uptadedList = taskList.map((t) =>
        t.id === task.id ? uptadedTask : t
      );
      setTaskList(uptadedList);
      setLoading(false);
    } else {
      throw new Error();
    }
  };

  return (
    <Fragment>
      <div className={task.done ? "task done" : "task"} key={index}>
        <div className="task-actions">
          <i className="bx bx-check" onClick={() => handleChecked()}></i>
        </div>
        <p>{task.title}</p>
        <div className="task-actions">
          <i className="bx bx-trash" onClick={() => handleDelete()}></i>
          <i className="bx bx-pencil" onClick={() => setModalIsOpen(true)}></i>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          setModalIsOpen={setModalIsOpen}
          task={task}
          taskList={taskList}
          setTaskList={setTaskList}
          handleDelete={handleDelete}
          setLoading={setLoading}
        />
      )}
    </Fragment>
  );
};

export default ToDoItem;
