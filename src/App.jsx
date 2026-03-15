import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import { GiHamburgerMenu } from "react-icons/gi";
import TaskHeader from "./components/TaskHeader";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const retrived_data = localStorage.getItem("tasks");
      return retrived_data ? JSON.parse(retrived_data) : [];
    } catch (err) {
      console.log(err);
      return [];
    }
  });
  const [filter, setFilter] = useState("all");
  const [isLeftBlock, setIsLeftBlock] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text: text,
      isCompleted: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }
  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) => {
        return task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task;
      }),
    );
  }

  function editTask(id, editedTaskText) {
    setTasks((prev) =>
      prev.map((task) => {
        return task.id === id ? { ...task, text: editedTaskText } : task;
      }),
    );
  }

  function changeFilter(item) {
    setFilter(item);
  }

  return (
    <>
      <div className={isLeftBlock ? "leftBlock" : "leftBlockHidden"}>
        <div className="appMenu">
          <div>Task Manager</div>
          <button
            className="giHamburgerMenuButton"
            onClick={() => setIsLeftBlock((prev) => !prev)}
          >
            <GiHamburgerMenu className="giHamburgerMenu" />
          </button>
        </div>
        <FilterBar filter={filter} tasks={tasks} onChange={changeFilter} />
      </div>
      <div className="rightBlock">
        <TaskHeader
          filter={filter}
          setIsLeftBlock={setIsLeftBlock}
          isLeftBlock={isLeftBlock}
        />
        <TaskForm onAddTask={addTask} />
        <TaskList
          filter={filter}
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
        />
      </div>
    </>
  );
}

export default App;
