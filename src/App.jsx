import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [title, setTitle] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [taskObj, setTaskObj] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:5001/todos");
      const data = await response.json();
      setTaskList(data);
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      id: Math.random(),
      title: title,
      done: false,
    };
    if (title === "") {
      return;
    }
    const response = await fetch("http://localhost:5001/todos", {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      setTaskList([...taskList, await response.json()]);
    } else {
      throw new Error();
    }
    setTitle("");
  };

  const handleDelete = async (task) => {
    const response = await fetch(`http://localhost:5001/todos/${task.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTaskList((prevTaskList) =>
        prevTaskList.filter((t) => t.id !== task.id)
      );
    } else {
      throw new Error();
    }
  };

  const handleChecked = async (task) => {
    const uptadedTask = { ...task, done: !task.done };

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
    } else {
      throw new Error();
    }
  };
  const handleEdit = async (task) => {
    if (task.title === "") {
      handleDelete(task);
      setModalIsOpen(false);
      return;
    }
    const response = await fetch(`http://localhost:5001/todos/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      setModalIsOpen(false);
      const uptadedList = taskList.map((t) => (t.id === task.id ? task : t));
      setTaskList(uptadedList);
    } else {
      throw new Error();
    }
  };

  const handleEditModal = (task) => {
    setModalIsOpen(true);
    setTaskObj(task);
  };

  const handleDeleteAll = async () => {
    for (const task of taskList) {
      const response = await fetch(`http://localhost:5001/todos/${task.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error();
      }
    }
    setTaskList([]);
  };
  const handleCheckedAll = async () => {
    const updatedTaskList = taskList.map((task) => {
      return {
        ...task,
        done: true,
      };
    });
    console.log(updatedTaskList);
    const promises = updatedTaskList.map((task) =>
      fetch(`http://localhost:5001/todos/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
    );
    await Promise.all(promises);
    setTaskList(updatedTaskList);
  };
  return (
    <div className="App">
      <div className="todo-header">
        <h1>React To Do List </h1>
      </div>
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
        <button type="button" onClick={handleDeleteAll}>
          Deletar Todas as tarefas
        </button>
        <button type="button" onClick={handleCheckedAll}>
          Marcar Como Feita
        </button>
      </div>
      <main className="task-list">
        {taskList.map((task, index) => (
          <div className={task.done ? "task done" : "task"} key={index}>
            <p>{task.title}</p>
            <div className="task-actions">
              <i
                className="bx bx-check"
                onClick={() => handleChecked(task)}
              ></i>
              <i className="bx bx-trash" onClick={() => handleDelete(task)}></i>
              <i
                className="bx bx-pencil"
                onClick={() => {
                  handleEditModal(task);
                }}
              ></i>
            </div>
          </div>
        ))}
        {isModalOpen && (
          <Modal
            setModalIsOpen={setModalIsOpen}
            handleEdit={handleEdit}
            task={taskObj}
            setTask={setTaskObj}
          />
        )}
      </main>
    </div>
  );
}

export default App;
