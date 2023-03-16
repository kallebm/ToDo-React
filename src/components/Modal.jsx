import React, { useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ setModalIsOpen, handleEdit, task, setTask }) => {
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
              value={task.title}
              onChange={(e) =>
                setTask({
                  ...task,
                  title: e.currentTarget.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEdit(task);
                }
              }}
            />
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.editBtn}
                onClick={() => handleEdit(task)}
              >
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
