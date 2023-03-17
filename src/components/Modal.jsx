import React, { useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({
  setModalIsOpen,
  task,
  taskList,
  setTaskList,
  handleDelete,
  setLoading,
}) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = async () => {
    if (editedTask.title === "") {
      handleDelete();
      setModalIsOpen(false);
      return;
    }
    setLoading(true);
    const response = await fetch(`http://localhost:5001/todos/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    });

    if (response.ok) {
      setModalIsOpen(false);
      const uptadedList = taskList.map((t) =>
        t.id === task.id ? editedTask : t
      );
      setTaskList(uptadedList);
      setLoading(false);
    } else {
      throw new Error();
    }
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setModalIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button
            className={styles.closeBtn}
            onClick={() => setModalIsOpen(false)}
          >
            <i className="bx bx-x" style={{ marginBottom: "-3px" }}></i>
          </button>
          <div className={styles.modalContent}>
            <input
              type="text"
              placeholder="Edite..."
              value={editedTask.title}
              onChange={(e) => {
                setEditedTask({ ...editedTask, title: e.currentTarget.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEdit();
                }
              }}
            />
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.editBtn} onClick={() => handleEdit()}>
                Editar
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setModalIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
