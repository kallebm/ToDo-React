import React, { Fragment, useState } from "react";
import Modal from "./Modal";
import { ReactComponent as Loader } from "./assets/spinner.svg";

const ToDoItem = ({ task, index, taskList, setTaskList }) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isLoadingChecked, setLoadingChecked] = useState(false);
  const [isLoadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    const response = await fetch(`http://localhost:5001/todos/${task.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTaskList((prevTaskList) =>
        prevTaskList.filter((t) => t.id !== task.id)
      );
      setLoadingDelete(false);
    } else {
      new Error();
    }
  };

  const handleChecked = async () => {
    const uptadedTask = { ...task, done: !task.done };
    setLoadingChecked(true);
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
      setLoadingChecked(false);
    } else {
      throw new Error();
    }
  };

  return (
    <Fragment>
      <div className={task.done ? "task done" : "task"} key={index}>
        <div className="task-actions">
          <button onClick={() => handleChecked()} disabled={isLoadingChecked}>
            {isLoadingChecked ? (
              <Loader className="spinner" disabled={true} />
            ) : (
              <i className="bx bx-check"></i>
            )}
          </button>
        </div>
        <p>{task.title}</p>
        <div className="task-actions">
          <button onClick={() => handleDelete()} disabled={isLoadingDelete}>
            {isLoadingDelete ? (
              <Loader className="spinner" />
            ) : (
              <i className="bx bx-trash"></i>
            )}
          </button>
          <button>
            <i
              className="bx bx-pencil"
              onClick={() => setModalIsOpen(true)}
            ></i>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          setModalIsOpen={setModalIsOpen}
          task={task}
          taskList={taskList}
          setTaskList={setTaskList}
          handleDelete={handleDelete}
        />
      )}
    </Fragment>
  );
};

export default ToDoItem;
